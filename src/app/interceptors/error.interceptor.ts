import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { AuthenticationService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err, oi) => {
            if (err.status === 401 || err.status === '401') {
                localStorage.removeItem('userName');
                localStorage.removeItem('userCredentials');
                localStorage.removeItem('userAccess');
                this.router.navigate(['/loginError', 'Sua sessão expirou, por favor, faça o login novamente.']);
            }
            throw err;
        }));
    }
}
