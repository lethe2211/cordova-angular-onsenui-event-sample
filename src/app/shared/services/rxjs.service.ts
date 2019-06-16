import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RxJSService {

    public event$: Observable<void>;
    private event: Subject<void>;

    constructor() {
        this.event = new Subject<void>();
        this.event$ = this.event.asObservable();
    }

    public notify() {
        this.event.next();
    }
}