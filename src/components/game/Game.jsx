import React from "react";
import {Board} from "./components/Board.jsx"
import {calculateWinner} from "./../../helpers/calculateWinner.js"

import "./style/Game.css"


class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: [
            {
                squares: Array(9).fill(null)
            },
            ],
            xIsNext: true,
            stepNumber: 0
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const currentMove = history[history.length-1].squares; // получаем массив последнего состояния доски
        const squares = currentMove.slice(); // делаем копию

        if (calculateWinner(squares) === null && squares[i] === null){
          const x = this.state.xIsNext;
          if (x){
              squares[i] = "X"
          } else {
              squares[i] = "O";
          }
          
          this.setState((state) => {
              return {
                history: history.concat(
                    [
                        {
                            squares: squares,
                        }
                    ]
                ),
              xIsNext: !x,
              stepNumber: history.length,
            } 
          })
      }
    }

    jumpTo(step) {
        this.setState((state) => {
            return {
                stepNumber: step,
                xIsNext: (step % 2) === 0,
            }
        })
    }

    render() {
        const history = this.state.history;
        const currentMove = history[this.state.stepNumber];
        const winner = calculateWinner(currentMove.squares);
        let status = "";

        if (!winner){
            status = "Текущий ход: " + (this.state.xIsNext ? "X" : "O")
        } else {
            status = "Победитель " + winner; 
        }

        const movesArray = history.map((step, move) => {
            const desc = move ? 'Перейти к ходу #' + move : 'К началу игры';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });

        return (
            <div className="game">
            <div className="game-board">
                <Board 
                squares={currentMove.squares}
                onClick={(event) => this.handleClick(event)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{movesArray}</ol>
            </div>
            </div>
        );
        }
  }

export default Game