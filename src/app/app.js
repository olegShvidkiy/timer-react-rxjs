import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  interval,
  NEVER,
  scan,
  startWith,
  Subject,
  switchMap,
  tap,
} from "rxjs";
import { Timer } from "../components/timer/timer";
import cls from "./app.module.css";

const subject = new Subject();
export function App() {
  const [timerOn, setTimerOn] = useState(false);
  const [time, setTime] = useState(0);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    subject
      .pipe(
        startWith({ pause: true, counterValue: 0 }),
        scan((acc, val) => ({ ...acc, ...val })),
        tap((val) => setTime(val.counterValue)),
        switchMap((state) =>
          state.pause
            ? NEVER
            : interval(1000).pipe(
                tap(() => {
                  state.counterValue += 1;
                  setTime(state.counterValue);
                })
              )
        )
      )
      .subscribe();
  }, []);
  function onStart() {
    if (!timerOn) {
      subject.next({ pause: false });
      setTimerOn(!timerOn);
    } else {
      subject.next({ pause: true, counterValue: 0 });
      setTimerOn(!timerOn);
    }
  }
  function onWait() {
    if (!wait) {
      setTimerOn(false);
      setWait(!wait);
      subject.next({ pause: true });
    } else {
      setWait(!wait);
      setTimerOn(true);
      subject.next({ pause: false });
    }
  }
  function onReset() {
    subject.next({ counterValue: 0 });
  }
  return (
    <div>
      <Timer time={time}></Timer>

      <div className={cls.btnsWrapper}>
        <Button variant="contained" color="primary" onClick={() => onStart()}>
          start/stop
        </Button>
        <Button
          variant="contained"
          color="primary"
          onDoubleClick={() => onWait()}
        >
          {wait ? "continue" : "wait"}
        </Button>
        <Button variant="contained" color="primary" onClick={() => onReset()}>
          reset
        </Button>
      </div>
    </div>
  );
}
