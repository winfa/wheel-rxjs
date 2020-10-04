import { Observer } from "./observer";
import { Subscription } from "./subscription";

export class Observable<T> {
    constructor(
        private onSubscribe: (observer: Observer<T>) => void,
        private onUnsubscribe?: (observer: Observer<T>) => void
    ) { }

    subscribe(...args: [next: (val: T) => (any | void), error?: ((err: Error) => void), complete?: (() => void)] | [Observer<T>]) {
        const observer = typeof args[0] === "function" ? new Observer<T>(args[0], args[1], args[2]) : args[0];

        this.onSubscribe(observer);
        return new Subscription(observer, this.onUnsubscribe);
    }

    pipe(...operators: ((observable: Observable<any>) => Observable<any>)[]) {
        return operators.reduce((previousState: Observable<any>, operator) => {
            return operator(previousState);
        }, this);
    }
}

export function of<T>(iterable: Iterable<T>) {
    return new Observable<T>((ob) => {
        for (const val of iterable) {
            ob.next(val);
        }
    });
}

export function interval(millisecond: number) {
    let number = 0;
    let currentInterval: NodeJS.Timeout;
    return new Observable<number>((observer) => {
        currentInterval = setInterval(() => {
            observer.next(number);
            number = number + 1;
        }, millisecond);
    }, () => {
        clearTimeout(currentInterval);
    });
}
