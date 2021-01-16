import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ContractDTOModel } from '../model/exports';

@Injectable({
    providedIn: 'root'
})
export class BehaviorContract {

    public contractDTOModel: ContractDTOModel = new ContractDTOModel();
    private dataSource = new BehaviorSubject<ContractDTOModel>(this.contractDTOModel);
    public data = this.dataSource.asObservable();

    constructor() {}

    public setData(data: ContractDTOModel) {
        this.dataSource.next(data);
    }

    public getData(): Observable<ContractDTOModel> {
        return this.data;
    }
}