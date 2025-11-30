import { useState} from "react";
import Confetti from "react-confetti";

const width = window.innerWidth;
const height = window.innerHeight;

export default function App() {

  function getRandomNumber() {
    return Math.floor(Math.random() * 6 + 1);
  }

  const generateDiceArray = () =>
    Array.from({ length: 10 }, (_, index) => ({
      id: index,
      value: getRandomNumber(),
      shouldRoll: true
    }));

  const [diceData, setDiceData] = useState(() => generateDiceArray());
  const [count, setCount] = useState(0);
  const [traceValue, setTraceValue] = useState(null);

  
  function roll() {
    setDiceData(prevData =>
      prevData.map(data =>
        data.shouldRoll
          ? { ...data, value: getRandomNumber() }
          : data
      )
    );
  }

  function newGame() {
    setDiceData(generateDiceArray());
    setCount(0);
    setTraceValue(null);
    console.log("new game");
  }

  function toggle(id) {
    const clickedValue = diceData[id].value;

    if (count === 0) {
      setTraceValue(clickedValue);
    }

    // Allow toggle only if value matches the initial traceValue
    if (clickedValue === traceValue || count === 0) {
      setDiceData(prevData =>
        prevData.map(data =>
          data.id === id
            ? { ...data, shouldRoll: !data.shouldRoll }
            : data
        )
      );

      setCount(prev =>
        diceData[id].shouldRoll ? prev + 1 : prev - 1
      );

    } else {
      window.alert("Please go with same dice value");
    }
  }

  const diceHtml = diceData.map(data => (
    <button
      key={data.id}
      onClick={() => toggle(data.id)}
      className={data.shouldRoll ? "" : "no"}
    >
      {data.value}
    </button>
  ));

  const RollButton = (
    <button id="roll-button" onClick={roll}>
      Roll
    </button>
  );

  const NewGameButton = (
    <button id="new-game-button" onClick={newGame}>
      New Game
    </button>
  );

  return (
    <main>
      {count === 10 && (
        <Confetti width={width} height={height} />
      )}

      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click
        <br />
        each dice to freeze it at its current value
        <br />
        between rolls.
      </p>

      <div className="dice-container">{diceHtml}</div>

      {count === 10 ? NewGameButton : RollButton}
    </main>
  );
}
