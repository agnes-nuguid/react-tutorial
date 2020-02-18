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
            squares: Array(9).fill(null),
            // Setup that 'X' is default first player
            xIsNext: true
        };
    }

    handleClick(i) {
        // we use .slice to create a copy of the squares
        const squares = this.state.squares.slice();

        // Will exit if there is a winner or Square is already marked[to avoid overriding the previous X or O]
        if(calculateWinner(this.state.squares) || squares[i]) {
            return;
        }

        // Will change X | O marker based on the xIsNext
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            // Updates the this.state.squares array
            squares: squares,
            // Flips xIsNext boolean value every time the board is clicked
            xIsNext: !this.state.xIsNext
        });
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
        // Checks and saves in the variable winner for the winner
        const winner = calculateWinner(this.state.squares);

        let status;
        // Status shows if there is a winner:
        if(winner) {
            status = 'Winner is: ' + winner
        } else {
            // Else it displays whose turn it is
            status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
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

function calculateWinner(squares) {

    // Positions in the Board that need to be monitored for a winner
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Loops in each of the Winner line combinations
    for (let i = 0; i < lines.length; i++) {
        // Defines each line to what we need to compare
        const [a, b, c] = lines[i];

        // Checks if the Square is marked, and if all 3 squares have the same value
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

            // returns the value of the Square | the Winner
            return squares[a];
        }
    }

    // If after looping it didn't find a winning combination, don't return anything.
    return null;
}