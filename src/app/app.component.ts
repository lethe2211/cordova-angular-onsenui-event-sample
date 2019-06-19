import { Component, SimpleChanges, OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { LoggerService } from './shared/services/logger.service';
import { FirstComponent } from './first/first.component';

@Component({
    selector: 'app',
    template: require('./app.component.html')
})
export class AppComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

    firstScreen = FirstComponent; /* Start point */

    readonly componentName = "AppComponent";

    constructor(
      private logger: LoggerService
    ) {
      this.logger.logAngularEvents(`${this.componentName}#constructor()`);
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.logger.logAngularEvents(`${this.componentName}#ngOnChanges`);
    }

    ngOnInit(): void {
      this.logger.logAngularEvents(`${this.componentName}#ngOnInit`);
    }

    ngDoCheck(): void {
      this.logger.logAngularEvents(`${this.componentName}#ngDoCheck`);
    }

    ngAfterContentInit(): void {
      this.logger.logAngularEvents(`${this.componentName}#ngAfterContentInit`);
    }

    ngAfterContentChecked(): void {
      this.logger.logAngularEvents(`${this.componentName}#ngAfterContentChecked`);
    }

    ngAfterViewInit(): void {
      this.logger.logAngularEvents(`${this.componentName}#ngAfterViewInit`);
    }

    ngAfterViewChecked(): void {
      this.logger.logAngularEvents(`${this.componentName}#ngAfterViewChecked`);
    }

    ngOnDestroy(): void {
      this.logger.logAngularEvents(`${this.componentName}#ngOnDestroy`);
    }
}
