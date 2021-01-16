import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

import { BaseComponent } from '../base/base.component';
import { BehaviorContract, BehaviorPath } from '../service/exports';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit, AfterViewChecked {
  public path = 'buy';
  public info = 'Para utilizar o POS One você precisa da Moderninha Smart ou Moderninha X da PagSeguro';

  public form = new FormGroup({
    radio: new FormControl('', Validators.required)
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
    super.loadContractDTOModel();
    // tslint:disable-next-line: no-string-literal
    this.form.controls['radio'].setValue(this.contractDTOModel.isHaveMachine);
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  public getValueRadio() {
    localStorage.setItem('isMachine', this.form.value.radio);
  }

  public onReceipt(form: FormGroup, route: string) {
    this.contractDTOModel.isHaveMachine = form.value.radio;
    route === 'buy' ? this.contractDTOModel.selectMachine = [] : null;
    this.behaviorContract.setData(this.contractDTOModel);
    this.behaviorPath.setPathData(route);
    this.goToPage(route);
  }
}
