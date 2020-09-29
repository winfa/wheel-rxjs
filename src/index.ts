import { Observable } from "./observable";
import { Observer } from "./observer"

const test$ = new Observable((observer: Observer<number>) => {
    observer.next(4);
    observer.next(5);
});

const subscription = test$.subscribe((val) => {
    console.log(val);
});

subscription.unsubscribe();