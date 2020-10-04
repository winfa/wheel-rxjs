import { interval, Observable, of } from "./observable";
import { filter, map, reduce, scan, switchMap, take } from "./operators";


// interval(1000).pipe(take(6), filter((val) => val % 2 === 0), map((val) => `${val} --- 1`)).subscribe(console.log);
const test1$ = interval(1000).pipe(take(6), filter((val) => val % 2 === 0), map((val) => `${val} --- 1`));
const test2$ = interval(3000).pipe(take(3));

function getTest(number: number) {
    return interval(1000).pipe(take(6), map((val) => `${val} --- ${number}`));
}

test2$.pipe(switchMap(getTest)).subscribe(console.log);
