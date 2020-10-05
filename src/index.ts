import { interval, Observable, of } from "./observable";
import { Observer } from "./observer";
import { exhaustMap, filter, map, reduce, scan, switchMap, take } from "./operators";
import { Subject } from "./subject";

const test$ = interval(1000).pipe(take(3));

// test$.subscribe((val) => { console.log(val, '......1..........') });
// test$.subscribe((val) => { console.log(val, '......2..........') });

const subject = new Subject();
subject.subscribe((val) => { console.log(val, '......1..........') });
subject.subscribe((val) => { console.log(val, '......2..........') });

test$.subscribe(subject);
