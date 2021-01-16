import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ObterTokenCartaoRequest } from '../model/pag-seguro/obter-token-cartao-request.model';

@Injectable({
  providedIn: 'root'
})
export class PagSeguroServiceService {

  constructor(private httpClient: HttpClient) {}

  postObterTokenDoCartao(request: ObterTokenCartaoRequest): Observable<any> {
    const url = `${environment.url_uol}${environment.url_obter_token_do_cartao}`;
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded');
    // tslint:disable-next-line:max-line-length
    const body = `amount=${request.amount}&cardBrand=${request.cardBrand}&cardCvv=${request.cardCvv}&cardExpirationMonth=${request.cardExpirationMonth}&cardExpirationYear=${request.cardExpirationYear}&cardNumber=${request.cardNumber}&sessionId=${request.sessionId}`;
    return this.httpClient.post<any>(url, body, { headers }).pipe(map(response => {
      return response;
    }));
  }


}
