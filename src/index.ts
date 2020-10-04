import { interval, Observable, of } from "./observable";
import { map, take } from "./operators";


interval(1000).pipe(take(3), map((val) => val + 10)).subscribe(console.log);
