import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Changed to a function component since it only renders and does not have its own state
function Square(props) {
    return (
        
        <button 
            // either 'square' | 'square winner'
            className={props.className}
            // shortened onClick after modifying Square to a function component
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(s) {
        // Add the parentheses so JS doesn't insert a semicolon after return and break our code
        return (
            <Square 
                // Will check if the square is included in the winning combination
                className={this.props.winningSquares.includes(s) ? 'square winner' : 'square'}
                // We're passing 2 props from Game > Board > Square: value and onClick
                value={this.props.squares[s]}
                onClick={() => this.props.onClick(s)}
                // Added key since squares is now a rendered list
                key={s}
            />
        );
    }

    render() {
        return (
            <div> {
                // Loops into 3 rows, define each as row
                [0, 1, 2].map((row) => {
                    return (
                        <div 
                            className="board-row"
                            // Defines a key for each row
                            key={row}
                        > {
                            // Loop into 3 columns, define each as column
                            [0, 1, 2].map((column) => {

                                return this.renderSquare(3 * row + column);
                            })
                        } </div>
                    );
                })
            } </div>
        );        
    }
}

class Game extends React.Component {

    // Moved up from Board so it can monitor the history
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                // Initializes move [null, null]
                move: Array(2).fill(null),
                squares: Array(9).fill(null)                
            }],
            // Initializes the sorting
            sortingIsAsc: true,
            // Initializes the step/move we are in
            stepNumber: 0,
            xIsNext: true
        };
    }

    // Moved from the board to handle the Game History
    handleClick(i) {
        // Defines current history
        // After user makes another move, .slice will remove all proceeding history after the stepNumber+1 
        const history = this.state.history.slice(0, this.state.stepNumber + 1);

        // Defines the latest squares as the current squares displayed
        const current = history[history.length - 1];

        // We use .slice to create a copy of the current squares
        const squares = current.squares.slice();

        // Will exit if there is a winner or Square is already marked[to avoid overriding the previous X or O]
        if(calculateWinner(squares) || squares[i]) {
            return;
        }

        // Will change X | O marker based on the xIsNext
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            // Updates History with the latest squares and move
            history: history.concat([{
                // Move: [col, row]
                move: [(i % 3) + 1, Math.floor(i / 3) + 1],
                squares: squares
            }]),
            // Updates the stepNumber to the current total number of moves made
            stepNumber: history.length,
            // Flips xIsNext boolean value every time the board is clicked
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            // Updates the stepNumber to what was selected in the history
            stepNumber: step,
            // Updates whose turn it is since it is alternating, modulo can be used
            xIsNext: (step % 2) === 0
        });
    }

    handleSorting() {
        this.setState({
            // Flips sortIsAsc boolean value every time the sort button is clicked
            sortingIsAsc: !this.state.sortingIsAsc
        });
    }

    render() {
        // Defines current history
        const history = this.state.history;

        // Defines the latest squares displayed as the current squares\
        // Updated to display the squares the user selected from the Moves history 
        const current = history[this.state.stepNumber];

        // Checks and stores winner
        const winner = calculateWinner(current.squares);

        // Shows Past Moves
        const moves = history.map((step, move) => {
            const desc = move ?
                // Button description will include the Move# and step.move
                'Go to Move #' + move + ': ' :
                // Else, intialize to:
                'Go to game start';
            return (
                <div key={move}>
                    <button
                        // Adds active class if specific move is the same as the stepNumber(selected)
                        className={move === this.state.stepNumber ? 'active' : ''}
                        onClick={() => this.jumpTo(move)}
                    >
                    {desc}
                    </button>{ move === 0 ? '' : ': (' + step.move + ')'}
                </div>
            );
        });

        let arrow;
        if (this.state.sortingIsAsc) {
            moves.sort();
            arrow = '↑';
        } else {
            moves.reverse();
            arrow = '↓';
        }

        let status;
        // Status shows if there is a winner:
        if(winner) {
            status = 'Winner is: ' + winner[0];
        // If the board is already filled up and no winner
        } else if(this.state.stepNumber === 9) {
            status = 'It\'s a draw!' ;
        } else {
            // Else it displays whose turn it is
            status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        // Pass on the winning squares if there is a winner
                        winningSquares={winner ? winner[1] : []}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div><button onClick={() => this.handleSorting()}>Sort {arrow}</button></div>
                    <div className="history">{moves}</div>
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

            // Returns the value of the Square and the winning line
            return [squares[a], lines[i]];
        }
    }

    // If after looping it didn't find a winning combination, don't return anything.
    return null;
}