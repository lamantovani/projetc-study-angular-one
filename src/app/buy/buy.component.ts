import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

import { BaseComponent } from '../base/base.component';

import { POSOneEnum } from '../enumerator/posone.enum';
import { POSOneConverter } from '../converter/posone-converter';

import { License } from '../model/exports';
import { BehaviorContract, BehaviorPath } from '../service/exports';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent extends BaseComponent implements OnInit, AfterViewChecked {

  planPrice1 = POSOneEnum.PLAN_PRACE_1;
  planPrice2 = POSOneEnum.PLAN_PRACE_2;
  planPrice3 = POSOneEnum.PLAN_PRACE_3;

  planName1 = POSOneEnum.DESCRIPTION_PLAN_NAME_1;
  planName2 = POSOneEnum.DESCRIPTION_PLAN_NAME_2;
  planName3 = POSOneEnum.DESCRIPTION_PLAN_NAME_3;

  planBenefit1 = POSOneEnum.DESCRIPTION_PLAN_DENEFIT_1;
  planBenefit2 = POSOneEnum.DESCRIPTION_PLAN_DENEFIT_2;
  planBenefit3 = POSOneEnum.DESCRIPTION_PLAN_DENEFIT_3;

  public listLicense: License[] = new Array<License>();

  public form = new FormGroup({
    model: new FormControl({}, Validators.required),
    license: new FormControl({}),
  });

  constructor(
    public router: Router,
    private behaviorPath: BehaviorPath,
    public behaviorContract: BehaviorContract,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(router, behaviorContract);
  }

  ngOnInit() {
    this.loadContractDTOModel();
    this.form.patchValue(POSOneConverter.mountFormValuesBuyPlanDTOModel(this.contractDTOModel.buyPlanDTOModel));
    this.loadLicense();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  loadLicense() {
    for (let index = 1; index <= 50; index++) {
      this.listLicense.push(new License(index));
    }
  }

  public onReceipt(form: FormGroup, route: string) {
    this.contractDTOModel.buyPlanDTOModel.amount = this.form.value.license.quantity;
    this.contractDTOModel.buyPlanDTOModel.select.name = this.form.value.model;
    this.contractDTOModel.buyPlanDTOModel.sumValue = this.getSumValue(this.form.value.model, this.form.value.license.quantity);
    this.behaviorContract.setData(this.contractDTOModel);
    this.behaviorPath.setPathData(route);
    this.goToPage(route);
  }

  public onReceiptNext(form: FormGroup, route: string) {
    this.contractDTOModel.buyPlanDTOModel.amount = this.form.value.license.quantity;
    this.contractDTOModel.buyPlanDTOModel.select.name = this.form.value.model;
    this.contractDTOModel.buyPlanDTOModel.sumValue = this.getSumValue(this.form.value.model, this.form.value.license.quantity);
    this.behaviorContract.setData(this.contractDTOModel);
    route = this.contractDTOModel.isHaveMachine === 'nao' ? route : 'payment';
    this.behaviorPath.setPathData(route);
    this.goToPage(route);
  }


  public getSumValue(type: string, quantity: number): number {
    switch (type) {
      case (POSOneEnum.PLAN_NAME_1): {
        return quantity * POSOneEnum.PLAN_PRACE_1;
      }
      case (POSOneEnum.PLAN_NAME_2): {
        return quantity * POSOneEnum.PLAN_PRACE_2;
      }
      case (POSOneEnum.PLAN_NAME_3): {
        return quantity * POSOneEnum.PLAN_PRACE_3;
      }
    }
  }

}


