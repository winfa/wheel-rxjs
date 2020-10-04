export class Observer<T> {
    constructor(
        public next: (val: T) => void,
        public err: (error: Error) => void,
        public complete: () => void,
    ) { }
}