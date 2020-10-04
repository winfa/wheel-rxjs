import { interval, Observable, of } from "./observable";
import { filter, map, reduce, scan, take } from "./operators";


// interval(1000).pipe(take(6), filter((val) => val % 2 === 0), map((val) => `${val} --- 1`)).subscribe(console.log);

interval(1000).pipe(take(6), scan((previousState, currentValue) => {
    return previousState + currentValue;
}, 0)).subscribe(console.log);
