import React, { useState, useRef } from "react";
import classes from "./StopWatch.module.css";
import { timer, interval } from "rxjs";

const StopWatch = () => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const countRef = useRef(null);

  //click handling state
  const [clickCounter, setClickCounter] = useState(0);

  // preventing form from submission
  const submitHandler = (event) => {
    event.preventDefault();
  };

  //handling Start
  const startHandler = () => {
    setIsActive((prevBool) => !prevBool);
    countRef.current = timer(1000, 1000).subscribe(() =>
      setTime((prevTime) => prevTime + 1)
    );
  };

  //handling Stop
  const stopHandler = () => {
    countRef.current.unsubscribe();
    setTime(0);
    setIsActive((prevBool) => !prevBool);
  };

  //handling Wait
  const waitHandler = () => {
    countRef.current.unsubscribe();
    setIsActive(false);
  };

  //handling Reset
  const resetHandler = () => {
    countRef.current.unsubscribe();
    setTime(0);
    setIsActive(false);

    startHandler();
  };

  //handling Double Click
  const clickCounterHandler = () => {
    setClickCounter((prevNumber) => prevNumber + 1);
    //as state is not updated immediately for the next line we can use "1" instead of "2".
    if (clickCounter === 1) {
      waitHandler();
    }

    let timer;
    timer = setTimeout(() => {
      setClickCounter(0);
    }, 299);
  };

  //formatting Time
  const timeFormatting = () => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <>
      <header className={classes.header}>
        <h1>StopWatch!</h1>
      </header>
      <h2>{timeFormatting()} </h2>

      <form className={classes.timer} onSubmit={submitHandler}>
        {isActive ? (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={stopHandler}
          >
            Stop
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={startHandler}
          >
            Start
          </button>
        )}
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={clickCounterHandler}
        >
          Wait
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={resetHandler}
        >
          Reset
        </button>
      </form>
    </>
  );
};

export default StopWatch;
