import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import {
  State,
  BrandCards,
  OauthTokenResponse,
  RegistrationRequest,
  PaymentTokenResponse,
  RegistrationResponse,
  PaymentTerminalsResponse,
  CompleteRegistrationRequest,
} from '../model/exports';

@Injectable({
  providedIn: 'root'
})
export class POSOneServiceService {

  constructor(private http: HttpClient) { }

  postOauthToken(): Observable<OauthTokenResponse> {

    const url = `${environment.url_host}${environment.url_oauth_token}`;
    const username = 'gingaone';
    const password = 'secret';

    const params = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('Username', username)
      .set('Password', password);

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic ' + btoa(`${username}:${password}`))
      .append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<OauthTokenResponse>(url, params, { headers })
      .pipe(
        map((token: OauthTokenResponse) => {
          localStorage.setItem(environment.name_ouath_token, JSON.stringify(token));
          return token;
        })
      );
  }

  postRegistration(request: RegistrationRequest): Observable<RegistrationResponse> {
    const url = `${environment.url_host}${environment.url_registration}`;
    return this.http.post<RegistrationResponse>(url, request);
  }

  getPaymentTerminals(): Observable<PaymentTerminalsResponse> {
    const url = `${environment.url_host}${environment.url_payment_terminals}`;
    return this.http.get<PaymentTerminalsResponse>(url);
  }

  getListState(): Observable<Array<State>> {
    return this.http.get<Array<State>>('../../../assets/json/states.json')
      .pipe(map((res: Array<State>) => res));
  }

  postPaymentToken(): Observable<PaymentTokenResponse> {
    const url = `${environment.url_host}${environment.url_payment_token}`;
    return this.http.post<PaymentTokenResponse>(url, {});
  }

  postCompleteRegistration(request: CompleteRegistrationRequest): Observable<any> {
    const url = `${environment.url_host}${environment.url_complete_registration}`;
    return this.http.post<any>(url, request);
  }

  public getListBrandCards(): Observable<BrandCards> {
    return this.http.get('../../../assets/mock/list-brand-cards.json')
      .pipe(map((res: BrandCards) => res));
  }

}
