import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class LoggerService {

    /* Max number of logs which this service retains in the logBuffer */
    readonly MAX_EVENTS = 40;

    /* Log flags */
    readonly LOGIC_EVENTS_ENABLED = true; /* Log logic events? */
    readonly ANGULAR_EVENTS_ENABLED = false; /* Log Angular related events? */
    readonly ONSENUI_EVENTS_ENABLED = true; /* Log Onsen UI related events? */

    private count;
    private logBuffer: Array<string>;
    private startTime;

    constructor() {
        this.count = 0;
        this.logBuffer = [];
        this.startTime = new Date().getTime();
        this.logAngularEvents("LoggerService#constructor()");
    }

    public getCurrentLog(): Array<string> {
        return this.logBuffer;
    }

    public logLogicEvents(message: string): void {
        if (this.LOGIC_EVENTS_ENABLED) {
            const elapsedMillis = new Date().getTime() - this.startTime;
            const logMessage = `${this.count}: ${message} / ${elapsedMillis}`;

            this.logBuffer.push(logMessage);
            console.log(logMessage);

            this.discard();
            this.count += 1;
        }
    }

    public logAngularEvents(message: string): void {
        if (this.ANGULAR_EVENTS_ENABLED) {
            const elapsedMillis = new Date().getTime() - this.startTime;
            const logMessage = `${this.count}: ${message} / ${elapsedMillis}`;

            this.logBuffer.push(logMessage);
            console.log(logMessage);

            this.discard();
            this.count += 1;
        }
    }

    public logOnsenUIEvents(message: string): void {
        if (this.ONSENUI_EVENTS_ENABLED) {
            const elapsedMillis = new Date().getTime() - this.startTime;
            const logMessage = `${this.count}: ${message} / ${elapsedMillis}`;

            this.logBuffer.push(logMessage);
            console.log(logMessage);

            this.discard();
            this.count += 1;
        }
    }

    public logCordovaEvents(message: string): void {
        const elapsedMillis = new Date().getTime() - this.startTime;
        const logMessage = `${this.count}: ${message} / ${elapsedMillis}`;

        this.logBuffer.push(logMessage);
        console.log(logMessage);

        this.discard();
        this.count += 1;
    }

    private discard(): void {
        if (this.logBuffer.length > this.MAX_EVENTS) {
            this.logBuffer.shift();
        }
    }
}