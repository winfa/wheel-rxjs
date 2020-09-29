import { Observer } from "./observer";
import { Subscription } from "./subscription";

export class Observable<T> {
    constructor(private registerObserver: (observer: Observer<T>) => void) {
    }

    subscribe(cb: (val: T) => void) {
        const observer = new Observer<T>(cb);
        this.registerObserver(observer);

        const subscription = new Subscription<T>(observer);
        return subscription;
    }
}
