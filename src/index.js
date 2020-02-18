import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Changed to a function component since it only renders and does not have its own state
function Square(props) {
    return (
        // shortened onClick after modifying Square to a function component
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    // Initiates state
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null)
        };
    }

    handleClick(i) {
        // we use .slice to create a copy of the squares
        const squares = this.state.squares.slice();
        // changes the squares[i] value to 'X'
        squares[i] = 'X';
        // Updates the this.state.squares array
        this.setState({squares: squares});
    }

    renderSquare(i) {
        // Add the parentheses so JS doesn't insert a semicolon after return and break our code
        // We're passing 2 props from Board to Square: value and onClick
        return (
            <Square 
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = 'Next player: X';

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

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/*status*/}</div>
                    <div>{/*TODO*/}</div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);