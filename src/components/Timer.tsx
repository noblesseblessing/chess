import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

let x:number;

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
  const [blackTime, setBlackTime] = useState(x=300)
  const [whiteTime, setWhiteTime] = useState(x=300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
    timer.current = setInterval(callback, 1000)
  }

  function decrementBlackTimer() {
    setBlackTime(prev => prev - 1)
  }
  function decrementWhiteTimer() {
    setWhiteTime(prev => prev - 1);
  }

  function setNewTime() {
    x=Number(prompt('Введите число'))
    handleRestart()
  }
  

  const handleRestart = () => {
    setWhiteTime(x)
    setBlackTime(x)
    restart()
  }

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Черные - {blackTime}</h2>
      <h2>Белые - {whiteTime}</h2>
      <div>
      <button onClick={setNewTime}>Set custom time</button>
      </div>
    </div>
  );
};

export default Timer;
