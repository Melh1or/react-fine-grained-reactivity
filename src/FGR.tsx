import { useEffect, useState } from "react";
import * as Rx from "rxjs";

type Atom<T> = Rx.BehaviorSubject<T>;

const createAtom = <T,>(initialValue: T): Atom<T> => {
  return new Rx.BehaviorSubject(initialValue);
};

const useSubscription = <T,>(obs: Rx.Observable<T>) => {
  useEffect(() => {
    const sub = obs.subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, [obs]);
};

const Cell = <T,>({ src }: { src: Rx.Observable<T> }) => {
  const [value, setValue] = useState<T | null>(null);

  useSubscription(src.pipe(Rx.tap(setValue)));

  return value;
};

const Clock = ({ ticks }: { ticks: Atom<number> }) => {
  console.log("Clock render");

  useSubscription(Rx.interval(1000).pipe(Rx.tap((n) => ticks.next(n + 1))));

  return <h1>Clock is ticking</h1>;
};

const ClockWatcher = ({ ticks }: { ticks: Atom<number> }) => {
  console.log("ClockWatcher render");

  return (
    <h1>
      <Cell src={ticks} />
    </h1>
  );
};

const Parent = () => {
  console.log("Parent render");

  const ticks = createAtom(0);

  return (
    <div>
      <Clock ticks={ticks} />
      <ClockWatcher ticks={ticks} />
      <h1>
        Only even ticks:{" "}
        <Cell src={ticks.pipe(Rx.filter((value) => value % 2 === 0))} />
      </h1>
    </div>
  );
};

export default Parent;
