import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractDTOModel } from '../model/exports';
import { BehaviorContract } from '../service/exports';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  public contractDTOModel = new ContractDTOModel();

  constructor(
    public router: Router,
    public behaviorContract: BehaviorContract
  ) { }

  ngOnInit() {
  }

  public goToPage(route: string, parameter?: string): void {
    parameter ? this.router.navigate([`/${route}/${parameter}`]) : this.router.navigate([`/${route}`]);
  }

  public loadContractDTOModel() {
    this.behaviorContract.getData().subscribe((contract: ContractDTOModel) => this.contractDTOModel = contract);
  }


}
