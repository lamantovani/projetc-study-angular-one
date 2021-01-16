import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BehaviorPath {

    public path: string;
    private pathSource = new BehaviorSubject<string>(this.path);
    public pathData = this.pathSource.asObservable();

    constructor() { 
        this.path = '';
    }

    public setPathData(path: string) {
        this.pathSource.next(path);
    }

    public getPathData(): Observable<string> {
        return this.pathData;
    }
}