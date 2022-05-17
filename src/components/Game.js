import React,{useState} from "react";
import {calulateWinner} from  "../helper"
import Board from "./Board";

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext,setXIsNext] = useState(true);
    const  winner = calulateWinner(history[stepNumber]);
    const xo = xIsNext ? "X" : "O";

    const handleClick = (i) => {
        const historyPiont = history.slice(0,stepNumber + 1);
        const current = historyPiont[stepNumber];
        const squares = [...current]
        // return if the square is filled or the game is over
        if(winner || squares[i]){
            return;
        }
        //select the square
        squares[i] = xo;
        setHistory([...historyPiont,squares]);
        setStepNumber(historyPiont.length);
        setXIsNext(!xIsNext);
}
const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
}


const renderMoves = () => 
    history.map((_step,move) => {
        const destination = move ?`Go to move #${move}` : "Go to game start";
   
        return (
            <li key={move}>
                <button onClick={() => {jumpTo(move)}}>{destination}</button>
            </li>
        );
});

return(
    <>
    <h1>React tic tac toe with hooks</h1>
    <Board squares={history[stepNumber]} onClick={handleClick}/>
    <div className="info-wrapper">
        <div>
         <h3> History</h3>
        {renderMoves()}
        </div>
        <h3>{winner?"Winner: "+ winner: "Next Player: "+ xo}</h3>
    </div>
    </>
)
}
export default Game;
