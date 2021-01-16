
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { isNullOrUndefined } from 'util';
import { POSOneServiceService, BehaviorPath } from './exports';
import { POSOneEnum } from '../enumerator/posone.enum';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    protected path: string;

    constructor(private service: POSOneServiceService, private behaviorPath: BehaviorPath, private router: Router) {
        this.behaviorPath.getPathData().subscribe(path => this.path = path);
    }

    public canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // tslint:disable-next-line:no-unused-expression
        !isNullOrUndefined(router.params[POSOneEnum.REDIRECT_BY_GUID]) ? this.service.postOauthToken().subscribe(response => { }) : null;
        return router.url[0].path === this.path ? of(true) : this.navigateByUrl();
    }

    private navigateByUrl(): Observable<boolean> {
        this.router.navigateByUrl('/access-denied');
        return of(false);
    }
}
