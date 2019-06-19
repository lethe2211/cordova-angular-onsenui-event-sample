import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy, AfterViewChecked, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { LoggerService } from '../shared/services/logger.service';
import { OnsNavigator } from 'ngx-onsenui';
import { FirstComponent } from '../first/first.component';
import { OnsBackButtonElement } from 'onsenui';
import { Subscription } from 'rxjs';
import { RxJSService } from '../shared/services/rxjs.service';

@Component({
    selector: 'ons-page[second]',
    template: require('./second.component.html')
})
export class SecondComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

    readonly componentName = "SecondComponent";

    logBuffer: Array<string> = [];
    eventSubscription: Subscription;

    @ViewChild('backButton') backButton: ElementRef<OnsBackButtonElement>;

    constructor(
        private logger: LoggerService,
        private rxjsService: RxJSService,
        private navigator: OnsNavigator
    ) {
        this.logger.logAngularEvents(`${this.componentName}#constructor()`);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.logger.logAngularEvents(`${this.componentName}#ngOnChanges`);
    }

    ngOnInit(): void {
        this.logger.logAngularEvents(`${this.componentName}#ngOnInit`);
        this.logBuffer = this.logger.getCurrentLog();
        this.eventSubscription = this.rxjsService.event$.subscribe(() => {
            this.logger.logLogicEvents(`${this.componentName}/subscribeEvent`);
        });
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

        // Overwrite the default behavior of ons-back-button
        this.backButton.nativeElement.onClick = (event) => {
            this.onClickOnsBackButton();
        }
    }

    ngAfterViewChecked(): void {
        this.logger.logAngularEvents(`${this.componentName}#ngAfterViewChecked`);
    }

    ngOnDestroy(): void {
        this.logger.logAngularEvents(`${this.componentName}#ngOnDestroy`);
    }

    onClickOnsBackButton(): void {
        this.logger.logLogicEvents(`${this.componentName}#onClickOnsBackButton`);
        this.navigator.element
        .popPage()
        .then(() => {
            this.logger.logLogicEvents(`${this.componentName}/PageStack: ${this.navigator.element.pages.map((elem) => elem.attributes[1].name)}`);
            this.logger.logLogicEvents(`${this.componentName}/onOnsBackButtonFinish`);
        })
        .catch(() => {
            this.logger.logLogicEvents(`${this.componentName}/onOnsBackButtonFailure`);
        });
    }

    onClickCheckCurrentPageStack(): void {
        this.logger.logLogicEvents(`${this.componentName}#onClickCheckCurrentPageStack`);

        // Hack to debug the current PageStack
        this.logger.logLogicEvents(`${this.componentName}/PageStack: ${this.navigator.element.pages.map((elem) => elem.attributes[1].name)}`);
    }

    onClickPushSecondPage(): void {
        this.logger.logLogicEvents(`${this.componentName}#onClickPushSecondPage`);
        this.navigator.element
        .pushPage(SecondComponent)
        .then(() => {
            this.logger.logLogicEvents(`${this.componentName}/PageStack: ${this.navigator.element.pages.map((elem) => elem.attributes[1].name)}`);
            this.logger.logLogicEvents(`${this.componentName}/onPushSecondPageFinish`);
        })
        .catch((error) => {
            this.logger.logLogicEvents(`${this.componentName}/onPushSecondPageFailure`);
        });
    }

    onClickResetToFirstPage(): void {
        this.logger.logLogicEvents(`${this.componentName}#onClickResetToFirstPage`);
        this.navigator.element
        .resetToPage(FirstComponent)
        .then(() => {
            this.logger.logLogicEvents(`${this.componentName}/PageStack: ${this.navigator.element.pages.map((elem) => elem.attributes[1].name)}`);
            this.logger.logLogicEvents(`${this.componentName}/onResetToFirstPageFinish`);
        })
        .catch((error) => {
            this.logger.logLogicEvents(`${this.componentName}/onResetToFirstPageFailure`);
        });
    }

    onClickNotifyRxJSEvent(): void {
        this.logger.logLogicEvents(`${this.componentName}#onClickNotifyEvent`);
        this.rxjsService.notify();
    }
}
