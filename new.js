import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming your CSS file is named App.css

const items = [
  { name: "balayya", image: "balayya.jpg" },
  { name: "chiru", image: "chiru.jpg" },
  { name: "venky", image: "venky.jpg" },
  { name: "prabhas", image: "prabhas.jpg" },
  { name: "ntr", image: "ntr.jpg" },
  { name: "allu", image: "allu.jpg" },
  { name: "raviteja", image: "raviteja.png" },
  { name: "vijay", image: "vijay.jpg" },
  { name: "sai", image: "sai.jpg" },
  { name: "rana", image: "rana.jpg" },
  { name: "charan", image: "charan.jpg" },
  { name: "nag", image: "nag.jpg" },
];

const Game = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [movesCount, setMovesCount] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds >= 60) {
      setSeconds(0);
      setMinutes(prevMinutes => prevMinutes + 1);
    }
  }, [seconds]);

  const timeGenerator = () => {
    const secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    const minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    return <span>Time: {minutesValue}:{secondsValue}</span>;
  };

  const movesCounter = () => {
    setMovesCount(prevMovesCount => prevMovesCount + 1);
  };

  const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;

    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      cardValues.push(tempArray[randomIndex]);
      tempArray.splice(randomIndex, 1);
    }
    return cardValues;
  };

  const matrixGenerator = (cardValues, size = 4) => {
    // Implement matrix generation logic here
  };

  const startGame = () => {
    setIsGameStarted(true);
    setMovesCount(0);
    setSeconds(0);
    setMinutes(0);
    setIntervalId(setInterval(() => timeGenerator(), 1000));
    setFirstCard(null);
    setSecondCard(null);
    setWinCount(0);
    const cardValues = generateRandom();
    setCards(cardValues);
    matrixGenerator(cardValues);
  };

  const stopGame = () => {
    setIsGameStarted(false);
    clearInterval(intervalId);
  };

  return (
    <div className="wrapper">
      <div className="stats-container">
        <div id="moves-count">Moves: {movesCount}</div>
        <div id="time">{timeGenerator()}</div>
      </div>
      <div className="game-container"></div>
      <button id="stop" className={isGameStarted ? '' : 'hide'} onClick={stopGame}>Stop Game</button>
      <div className="controls-container">
        <p id="result"></p>
        <button id="start" onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
};

export default Game;
