export class Observer<T> {
    private closed: boolean = true;

    constructor(
        private onNext: (val: T) => void,
        private onError: (error: Error) => void = ((error) => { console.log(error) }),
        private onComplete: () => void = (() => { }),
    ) {
    }

    next(val: T): void {
        this.closed && this.onNext(val);
    }

    error(error: Error): void {
        this.closed = true;
        this.onError(error);
    }

    complete() {
        this.closed = true;
        this.onComplete();
    }
}
