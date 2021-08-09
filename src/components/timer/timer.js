import cls from "./timer.module.css";
export function Timer({ time }) {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600) % 60;
  return (
    <div className={cls.timerWrapper}>
      <div className={cls.title}>Timer</div>
      <div className={cls.timer}>
        <div className={cls.timerBlock}>
          <span className="hours">
            {hours.toString().length > 1 ? hours : `0${hours}`}
          </span>
          hours
        </div>
        <div className={cls.timerBlock}>
          <span className="minutes">
            {minutes.toString().length > 1 ? minutes : `0${minutes}`}
          </span>
          minutes
        </div>
        <div className={cls.timerBlock}>
          <span className="seconds">
            {seconds.toString().length > 1 ? seconds : `0${seconds}`}
          </span>
          seconds
        </div>
      </div>
    </div>
  );
}
