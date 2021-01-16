import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseComponent } from '../base/base.component';
import { POSOneEnum } from '../enumerator/posone.enum';
import { POSOneConverter } from '../converter/posone-converter';

import { ContractDTOModel, CardModel, BrandCards, Brand, PaymentTokenResponse, } from '../model/exports';
import { POSOneServiceService, PagSeguroServiceService, BehaviorContract, BehaviorPath } from '../service/exports';

@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.scss']
})
export class CardDataComponent extends BaseComponent implements OnInit {

  public showLoad: boolean;
  public contractDTOModel = new ContractDTOModel();
  public brandCardName: string;

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    CVV: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.pattern(/^[0-9]/)]),
    cardNumber: new FormControl('', Validators.required),
  });

  constructor(
    public router: Router,
    public behaviorPath: BehaviorPath,
    public behaviorContract: BehaviorContract,
    private posOneService: POSOneServiceService,
    private pagSeguroService: PagSeguroServiceService
  ) {
    super(router, behaviorContract);
  }

  ngOnInit() {
    this.loadContractDTOModel();
  }

  public onPrevius(form: FormGroup, route: string, parameter?: string) {
    this.showLoad = true;
    this.contractDTOModel.cardModel = new CardModel(form);
    this.behaviorContract.setData(this.contractDTOModel);
    this.behaviorPath.setPathData(route);
    this.goToPage(route);
  }

  public onReceipt(form: FormGroup, route: string, parameter?: string) {
    this.showLoad = true;
    this.contractDTOModel.cardModel = new CardModel(form);
    this.behaviorContract.setData(this.contractDTOModel);
    parameter ? this.onPayment(this.contractDTOModel, route, parameter) : this.onPayment(this.contractDTOModel, route);
  }

  private onPayment(contract: ContractDTOModel, route: string, parameter?: string) {
    this.posOneService.postPaymentToken().subscribe((session: PaymentTokenResponse) => {
      this.getCardBrand(contract.cardModel.cardNumber).subscribe((brandCardName: string) => {
        const requestPagSeguro = POSOneConverter.mountObterTokenCartaoPagSeguro(contract, brandCardName, session.token);
        this.pagSeguroService.postObterTokenDoCartao(requestPagSeguro).subscribe((resposePagSeguro) => {
          const guid = localStorage.getItem(POSOneEnum.REDIRECT_BY_GUID);
          const request = POSOneConverter.mountCompleteRegistrationRequest(contract, guid, resposePagSeguro.token);
          this.posOneService.postCompleteRegistration(request).subscribe((response) => {
            this.showLoad = false;
            this.behaviorPath.setPathData(route);
            parameter ? this.goToPage(route, parameter) : this.goToPage(route);
          }, error => this.showError('ERRO AO COMPLETAR A CONTRATAÇÃO!', error));
        }, error => this.showError('ERRO AO OBTER TOKEN DO CARTÃO!', error));
      }, error => this.showError('ERRO AO OBTER NOME DA BANDEIRA DO CARTÃO!', error));
    }, error => this.showError('ERRO AO OBTER ID DA SESSÃO!', error));
  }

  private showError(msg: string, error: any) {
    this.showLoad = false;
    this.behaviorPath.setPathData('receipt');
    this.goToPage('receipt/error');
  }

  private getCardBrand(cardNumber: string): Observable<string> {
    return new Observable(observer => {
      this.posOneService.getListBrandCards().subscribe((brandCards: BrandCards) => {
        const brandName = this.searshBrandName(cardNumber, brandCards);
        return observer.next(brandName);
      });
    });
  }

  private searshBrandName(cardNumber: string, brandCards: BrandCards): string {
    let brandName = null;
    for (let index = 6; index >= 1; index--) {
      const searshCode = cardNumber.substr(0, index);
      brandCards.brands.forEach((brand: Brand) => {
        brand.codes.forEach(code => code === searshCode ? brandName = brand.name : null);
      });
      if (brandName) {
        return brandName;
      }
    }
    return brandName;
  }

  onChooseBrandCardName(form: FormGroup) {
    const minCardNumber = form.value.cardNumber.replace(/\D/g, '');
    if (minCardNumber.length >= 6) {
      this.getCardBrand(minCardNumber).subscribe((brandName: string) => {
        this.brandCardName = brandName.toLocaleLowerCase();
      });
    } else {
      this.brandCardName = '';
    }
  }
}
