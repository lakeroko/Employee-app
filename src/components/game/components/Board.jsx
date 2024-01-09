import React from "react";
import {Square} from "./Square";
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
      const x = this.state.xIsNext;
      if (x){
          squares[i] = "X"
      } else {
          squares[i] = "O";
      }

      this.setState({squares: squares, xIsNext: !x})
  }

  renderSquare(i) {
    return <Square 
    value={this.state.squares[i]}
    onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');;

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