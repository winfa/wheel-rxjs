export class Observer<T> {
    constructor(private subscribedAction: ((val: T) => void) | null) { }

    next(val: T) {
        this.subscribedAction && this.subscribedAction(val);
    }

    complete() {
        this.subscribedAction = null;
    }

    error() { }
}