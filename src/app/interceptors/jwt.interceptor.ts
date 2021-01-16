import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { POSOneServiceService } from '../service/posone-service.service';
import { OauthTokenResponse } from '../model/oauth-token/oauth-token-response.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private service: POSOneServiceService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.url.includes(environment.url_oauth_token)
            && !request.url.includes(environment.url_voice)
            && !request.url.includes(environment.url_obter_token_do_cartao)) {
            const token = JSON.parse(localStorage.getItem(environment.name_ouath_token));
            if (token && token.access_token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token.access_token}`
                    }
                });
            }

            this.service.postOauthToken().subscribe(() => {}, error => {
                console.log('ERRO AO OBTER TOKEN! ', error);
            });
        }
        return next.handle(request);
    }
}
