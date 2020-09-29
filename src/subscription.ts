import { Observer } from "./observer"

export class Subscription<T> {
    constructor(private observer: Observer<T>) {
    }

    unsubscribe() {
        this.observer.complete();
    }
}
