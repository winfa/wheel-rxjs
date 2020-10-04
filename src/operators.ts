import { Observable } from './observable';
import { Observer } from './observer';
import { Subscription } from './subscription';

export function map(mapper: (val: any) => any): (observable: Observable<any>) => Observable<any> {
    return observableOperator((observer: Observer<any>) => {
        return new Observer((val) => observer.next(mapper(val)));
    });
}

export function take(num: number): (observable: Observable<any>) => Observable<any> {
    return observableOperator((observer: Observer<any>) => {
        let times = 0;
        return new Observer((val) => {
            if (times <= num) {
                times = times + 1;
                observer.next(val);
            } else {
                observer.complete();
            }
        });
    });
}

export function filter(predicate: (val: any) => boolean): (observable: Observable<any>) => Observable<any> {
    return observableOperator((observer: Observer<any>) => {
        return new Observer((val) => {
            if (predicate(val)) {
                observer.next(val);
            }
        });
    });
}

export function reduce(reducer: (previousState: any, currentValue: any) => any, seed: any): (observable: Observable<any>) => Observable<any> {
    let previousState = seed;

    return observableOperator((observer: Observer<any>) => {
        return new Observer((val) => {
            previousState = reducer(previousState, val);
        }, undefined, () => {
            observer.next(previousState);
        });
    });
}

export function scan(scanner: (previousState: any, currentValue: any, index?: number) => any, seed: any): (observable: Observable<any>) => Observable<any> {
    let previousState = seed;

    return observableOperator((observer: Observer<any>) => {
        return new Observer((val) => {
            previousState = scanner(previousState, val);
            observer.next(previousState);
        });
    });
}

function observableOperator(observerOperator: (observer: Observer<any>) => Observer<any>): (observable: Observable<any>) => Observable<any> {
    return (observable: Observable<any>) => {
        let subscription: Subscription<any>;

        return new Observable<any>(observer => {
            subscription = observable.subscribe(observerOperator(observer))
        }, () => {
            subscription.unsubscribe();
        })
    }
}

export function switchMap(project: (val: any) => Observable<any>): (observable: Observable<any>) => Observable<any> {
    return observableOperator((observer: Observer<any>) => {
        let newObservable: Observable<any>;
        let subscription: Subscription<any>;

        return new Observer((val) => {
            subscription && subscription.unsubscribe();
            newObservable = project(val);

            subscription = newObservable.subscribe((newVal) => {
                observer.next(newVal);
            });
        });
    });
}
