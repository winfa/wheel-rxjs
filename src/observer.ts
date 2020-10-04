export class Observer<T> {
    constructor(
        public next: (val: T) => void,
        public error: (error: Error) => void = ((error) => { console.log(error) }),
        public complete: () => void = (() => { }),
    ) {
    }
}
