import React, { useState, useRef } from "react";
import classes from "./StopWatch.module.css";

const StopWatch = () => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const countRef = useRef(null);

  // preventing form from submission
  const submitHandler = (event) => {
    event.preventDefault();
  };

  //handling Start
  const startHandler = () => {
    setIsActive((prevBool) => !prevBool);
    countRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  //handling Stop
  const stopHandler = () => {
    clearInterval(countRef.current);
    setTime(0);
    setIsActive((prevBool) => !prevBool);
  };

  //handling Wait
  const waitHandler = () => {
    clearInterval(countRef.current);
    setIsActive((prevBool) => !prevBool);
  };

  //handling Reset
  const resetHandler = () => {
    clearInterval(countRef.current);
    setTime(0);
    setIsActive((prevBool) => !prevBool);

    startHandler();
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
        <h1>StopWatch via React.js!</h1>
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
          onClick={waitHandler}
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
