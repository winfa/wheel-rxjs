export class Observer<T> {
    private _closed: boolean = true;

    constructor(
        private onNext: (val: T) => void = (() => { }),
        private onError: (error: Error) => void = ((error) => { console.log(error) }),
        private onComplete: () => void = (() => { }),
    ) {
    }

    next(val: T): void {
        this._closed && this.onNext(val);
    }

    error(error: Error): void {
        this._closed = true;
        this.onError(error);
    }

    complete() {
        this._closed = true;
        this.onComplete();
    }

    get closed() {
        return this._closed;
    }
}
