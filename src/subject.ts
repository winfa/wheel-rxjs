import { Observer } from "./observer";
import { Subscription } from "./subscription";

export class Subject<T> extends Observer<T> {
    private observers: Observer<T>[] = [];
    constructor(
        onNext?: (val: T) => void,
        onError?: (error: Error) => void,
        onComplete?: () => void
    ) {
        super(onNext, onError, onComplete);
    }

    next(val: T) {
        super.next(val);
        this.observers?.forEach((observer) => {
            observer.next(val);
        });
    }

    subscribe(...args: [next: (val: T) => (any | void), error?: ((err: Error) => void), complete?: (() => void)] | [Observer<T>]) {
        const observer = typeof args[0] === "function" ? new Observer<T>(args[0], args[1], args[2]) : args[0];
        this.observers.push(observer);

        return new Subscription(observer, (currentObserver: Observer<T>) => {
            const index = this.observers.findIndex(observer => observer === currentObserver);
            this.observers = [...this.observers.slice(0, index), ...this.observers.slice(index + 1)];
        });
    }
}
