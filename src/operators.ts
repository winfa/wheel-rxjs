import { Observable } from './observable';
import { Subscription } from './subscription';

export function map(mapVal: (val: any) => any): (observable: Observable<any>) => Observable<any> {
    return (observable: Observable<any>) => {
        let subscription: Subscription<any>;

        return new Observable((ob) => {
            subscription = observable.subscribe((val: any) => {
                ob.next(mapVal(val));
            });
        }, () => {
            subscription.unsubscribe();
        });
    }
}

export function take(num: number): (observable: Observable<any>) => Observable<any> {
    return (observable: Observable<any>) => {
        let subscription: Subscription<any>;

        return new Observable((ob) => {
            let times = 0;

            subscription = observable.subscribe((val: any) => {
                times = times + 1;
                if (times <= num) {
                    ob.next(val);
                } else {
                    ob.complete();
                    subscription.unsubscribe();
                }
            });
        }, () => {
            subscription.unsubscribe();
        });
    }
}
