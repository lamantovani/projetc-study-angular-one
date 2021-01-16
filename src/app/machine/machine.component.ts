import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { BaseComponent } from '../base/base.component';

import { POSOneEnum } from '../enumerator/posone.enum';
import { POSOneConverter } from '../converter/posone-converter';

import { BuyMachineDTOModel, Machine } from '../model/exports';
import { BehaviorContract, BehaviorPath } from '../service/exports';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent extends BaseComponent implements OnInit {

  public priceMachineX = POSOneEnum.PRACE_MICHINE_MODERN_X;
  public priceMachineSMART = POSOneEnum.PRACE_MICHINE_SMART;

  public smarts: Machine[] = [];
  public modernX: Machine[] = [];

  public form = new FormGroup({
    smart: new FormControl(null),
    modernX: new FormControl(null)
  });

  constructor(
    public router: Router,
    public behaviorPath: BehaviorPath,
    public behaviorContract: BehaviorContract
  ) {
    super(router, behaviorContract);
  }

  ngOnInit() {
    this.loadContractDTOModel();
    this.form.patchValue(POSOneConverter.mountSelectedMachine(this.contractDTOModel.selectMachine));
    this.loadComboMachine();
  }

  public isDisabled(form: FormGroup): boolean {
    return form.value.smart && form.value.smart.value > 0 || form.value.modernX && form.value.modernX.value > 0 ? false : true;
  }

  loadComboMachine() {
    for (let index = 0; index <= 50; index++) {
      this.smarts.push(new Machine(index, String(index)));
      this.modernX.push(new Machine(index, String(index)));
    }
  }

  public onReceipt(form: FormGroup, route: string) {
    this.behaviorPath.setPathData(route);
    this.contractDTOModel.selectMachine = this.changeSlectMachine(form);
    this.behaviorContract.setData(this.contractDTOModel);
    this.goToPage(route);
  }

  changeSlectMachine(form: FormGroup): Array<BuyMachineDTOModel> {
    const list = new Array<BuyMachineDTOModel>();

    if (form.value.modernX.value > 0) {
      const moderninhaX = new BuyMachineDTOModel();
      moderninhaX.amount = this.form.value.modernX.value;
      moderninhaX.select.description = POSOneEnum.NAME_MACHINE_MODERN_X;
      moderninhaX.sumValue = POSOneEnum.PRACE_MICHINE_MODERN_X * moderninhaX.amount;
      list.push(moderninhaX);
    }

    if (form.value.smart.value > 0) {
      const smart = new BuyMachineDTOModel();
      smart.amount = this.form.value.smart.value;
      smart.select.description = POSOneEnum.NAME_MACHINE_SMART;
      smart.sumValue = POSOneEnum.PRACE_MICHINE_SMART * smart.amount;
      list.push(smart);
    }
    return list;
  }

}

