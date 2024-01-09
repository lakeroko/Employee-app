import React from "react";
import {Square} from "./Square";
import {calculateWinner} from "./../../../helpers/calculateWinner"


import "./../style/Board.css";

export class Board extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          squares: Array(9).fill(null),
          xIsNext: true
      }
  }

  handleClick(i) {
      const squares = this.state.squares.slice();

      if (calculateWinner(squares) === null && squares[i] === null){
        const x = this.state.xIsNext;
        if (x){
            squares[i] = "X"
        } else {
            squares[i] = "O";
        }
        this.setState({squares: squares, xIsNext: !x})
    }
  }

  renderSquare(i) {
    return <Square 
    value={this.state.squares[i]}
    onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const winner = calculateWinner(this.state.squares); 
    let status;

    if (winner != null){
      status = "Победитель " + winner;
    } else {
      status = "Следующий ход: " + (this.state.xIsNext ? "X" : "O")
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}