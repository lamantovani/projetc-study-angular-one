import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseComponent } from '../base/base.component';
import { POSOneConverter } from '../converter/posone-converter';

import { BehaviorContract, BehaviorPath } from '../service/exports';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent extends BaseComponent implements OnInit {

  listConfirmatioDTO: Array<ConfirmationDTO> = new Array<ConfirmationDTO>();
  sumary = {total: 0};

  public form = new FormGroup({
    accepted: new FormControl('', Validators.required)
  });

  constructor(
    public router: Router,
    public behavior: BehaviorContract,
    public behaviorPath: BehaviorPath
  ) {
    super(router, behavior);
  }

  ngOnInit() {
    this.loadContractDTOModel();
    // tslint:disable-next-line:max-line-length
    this.listConfirmatioDTO = POSOneConverter.mountListConfirmatioByContract(this.contractDTOModel.buyPlanDTOModel, this.contractDTOModel.selectMachine);
    this.listConfirmatioDTO.forEach(sum => this.sumary.total += sum.sumValue);
  }

  public onAccept() { }

  public onReceiptPrevius(form: FormGroup, route: string) {
    this.behaviorContract.setData(this.contractDTOModel);
    route = this.contractDTOModel.isHaveMachine === 'nao' ? route : 'buy';
    this.behaviorPath.setPathData(route);
    this.goToPage(route);
  }

  public onReceipt(form: FormGroup, route: string) {
    this.behaviorContract.setData(this.contractDTOModel);
    this.behaviorPath.setPathData(route);
    this.goToPage(route);
  }

}

export class ConfirmationDTO {
  img: string;
  name: string;
  quantity: number;
  sumValue: number;
  type: string;
  description: string;
}

