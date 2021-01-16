import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';

import { BaseComponent } from '../base/base.component';

import { BasicUtils } from '../utils/basic-utils';
import { POSOneEnum } from '../enumerator/posone.enum';
import { POSOneConverter } from '../converter/posone-converter';

import { SignupService, BehaviorContract, POSOneServiceService, BehaviorPath } from '../service/exports';
import { RegistrationRequest, RegistrationResponse, AddressInterface, ContractDTOModel, ClientData, AddressModel, State } from '../model/exports';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BaseComponent implements OnInit {

  public states: State[] = new Array<State>();

  public form = new FormGroup({
    phoneNumber: new FormControl('', [Validators.maxLength(16)]),
    cnpj: new FormControl('', [Validators.required, Validators.maxLength(18)]),
    email: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    responsibleName: new FormControl('', Validators.required),
    cnpjReadonly: new FormControl(false),

    complement: new FormControl(''),
    city: new FormControl('', Validators.required),
    state: new FormControl({}, Validators.required),
    number: new FormControl('', Validators.required),
    zipcode: new FormControl('', [Validators.required, Validators.maxLength(9)]),
    address: new FormControl('', Validators.required),
  });

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private behaviorPath: BehaviorPath,
    private signupService: SignupService,
    private service: POSOneServiceService,
    public behaviorContract: BehaviorContract
  ) {
    super(router, behaviorContract);
  }

  ngOnInit() {
    super.loadContractDTOModel();
    // tslint:disable-next-line:max-line-length
    this.form.patchValue(POSOneConverter.mountFormValuesClientDataAndAddress(this.contractDTOModel.clientData, this.contractDTOModel.address));
    this.service.getListState().subscribe(resp => this.states = resp);
    this.checkReceiverGUID();
  }

  checkReceiverGUID() {
    const guid = this.route.snapshot.params[POSOneEnum.REDIRECT_BY_GUID];
    localStorage.setItem(POSOneEnum.REDIRECT_BY_GUID, guid);

    if (BasicUtils.isNotEmpty(guid)) {
      const request = new RegistrationRequest(guid);
      this.service.postRegistration(request).subscribe((resp: RegistrationResponse) => {
        let nameState = '';
        this.states.map(state => state.code === resp.address.state ? nameState = state.name : null);
        this.form.patchValue(POSOneConverter.mountRegisterByPreOrder(resp, nameState));
      }, error => {
        console.log('REGISTRATION_ERROR ==> ', error);
      });
    }
  }

  public cadastrarEmpresa() { }

  public onReceipt(form: FormGroup, route: string) {
    this.contractDTOModel.clientData = new ClientData(form);
    this.contractDTOModel.address = new AddressModel(form);
    this.behaviorContract.setData(this.contractDTOModel);
    this.behaviorPath.setPathData(route);
    this.goToPage(route);
  }

  public getAddress(zipcode: string) {
    if (zipcode.length >= 8) {
      this.signupService.getAddress(zipcode).subscribe((address: AddressInterface) => {
        let nameState = '';
        this.states.map(state => state.code === address.uf ? nameState = state.name : null);
        this.form.patchValue(POSOneConverter.mountAddressByAutoComplete(address, nameState));
      });
    }
  }
}
