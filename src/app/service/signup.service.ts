import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AddressInterface } from '../model/exports';

@Injectable({
    providedIn: 'root'
})
export class SignupService {

    constructor(private http: HttpClient) { }

    public getAddress(zipcode: string): Observable<AddressInterface> {
        return this.http.get<AddressInterface>(`https://viacep.com.br/ws/${zipcode}/json/`).pipe();
    }
}