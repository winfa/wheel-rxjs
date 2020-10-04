import { Observer } from "./observer"

export class Subscription<T> {
    constructor(private observer: Observer<T>, private onUnsubscribe?: (observer: Observer<T>) => void) {
    }

    unsubscribe() {
        this.observer.next = () => { };
        this.observer.complete();
        this.onUnsubscribe && this.onUnsubscribe(this.observer);
    }
}
