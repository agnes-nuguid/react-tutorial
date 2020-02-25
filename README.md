# react-tutorial
This is a historical repository through commits on my journey in studying React based on the official [React Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html), including my solutions to the bonus challenges:


- [X] 1. [Display the location for each move in the format (col, row) in the move history list](#1-display-the-location-for-each-move-in-the-format-col-row-in-the-move-history-list)
- [X] 2. [Bold the currently selected item in the move list](#2-bold-the-currently-selected-item-in-the-move-list)
- [X] 3. [Rewrite Board to use two loops to make the squares instead of hardcoding them](#3-rewrite-board-to-use-two-loops-to-make-the-squares-instead-of-hardcoding-them)
- [X] 4. [Add a toggle button that lets you sort the moves in either ascending or descending order](#4-add-a-toggle-button-that-lets-you-sort-the-moves-in-either-ascending-or-descending-order)
- [X] 5. [When someone wins, highlight the three squares that caused the win](#5-when-someone-wins-highlight-the-three-squares-that-caused-the-win)
- [X] 6. [When no one wins, display a message about the result being a draw](#6-when-no-one-wins-display-a-message-about-the-result-being-a-draw)

## Solutions
### 1. Display the location for each move in the format (col, row) in the move history list
**Commit:** [Wrapping Up: Display Move Location in Move History](https://github.com/agnes-nuguid/react-tutorial/commit/0d741e0fbe803957ae6163eceefdc23d63190499)

![image](https://user-images.githubusercontent.com/22828458/74733155-bd1b4e00-5286-11ea-998c-444be62abb20.png)

1. Added new props `move` in `history`: a 2-length array that will be updated for every `handleClick(i)`

   ```jsx 
   class Game extends React.Component {
       constructor(props) {
           super(props);
           this.state = {
               history: [{
                   move: Array(2).fill(null),
                   squares: Array(9).fill(null)                
               }]
           };
       }
   }

2. Every time the square is clicked, update the `history` to include `move:` first element of the array will compute for the column `(i + 3) + 1` and the second element will compute for the row `Math.floor(i / 3) + 1`

   ```jsx
   handleClick(i) {
     // Previous code is the same

      this.setState({
         // Updates History with the latest squares
         history: history.concat([{
             move: [(i % 3) + 1, Math.floor(i / 3) + 1],
             squares: squares
         }]),
   }

3. Display each `step.move` in the `moves` list of the `render()` in the `Game` component

    ```jsx
   render() {
     // Previous code is the same
     // Shows Past Moves
     const moves = history.map((step, move) => {
         const desc = move ?
             // Button description will include the Move#
             'Go to move #' + move + ': Move(col, row): ('+ step.move + ')':

---

### 2. Bold the currently selected item in the move list
**Commit:** [Wrapping Up: Bold the currently selected item in the move list](https://github.com/agnes-nuguid/react-tutorial/commit/ded53ea26b2f5a644feecb69f2175c532035883c)

![image](https://user-images.githubusercontent.com/22828458/74820918-c4516300-533d-11ea-9eff-62cb82b8e2ca.png)
![image](https://user-images.githubusercontent.com/22828458/74820948-d29f7f00-533d-11ea-9b7d-37b7f0c816f6.png)
![image](https://user-images.githubusercontent.com/22828458/74820965-d8956000-533d-11ea-8649-ed2a0c1c8a5a.png)

1. Added `.active` class in `index.css` set to `font-weight: bold;`

   ```css
   /* Bolds the currently selected item in the move list */
   .active {
       font-weight: bold;
   }

2. Added a ternary operator for the `className` to add `.active` if the `key` on the list is the same as `this.state.stepNumber`

   ```jsx
   return (
      // Previous code is the same
      <li key={move}>
         <button
             // Adds active class if specific move is the same as the stepNumber(selected)
             className={move === this.state.stepNumber ? 'active' : ''}
             onClick={() => this.jumpTo(move)}
          >

---

### 3. Rewrite Board to use two loops to make the squares instead of hardcoding them
**Commit:** [Wrapping Up: Rewrite Board to use 2 Loops](https://github.com/agnes-nuguid/react-tutorial/commit/ab8ac31e2acf8bea047b7e0cb8880e133d2310b4)

Had a difficult time solving this because of [Picking a Key](https://github.com/agnes-nuguid/react-tutorial/commit/52e2b25cc026deefbf3fd95aa8631609ddf1ccd1). Eventually based my answer in[ merlew's solution in this Stackoverflow question](https://stackoverflow.com/questions/41667346/react-create-nested-components-with-loops/41667437#41667437) 

1. Added a key in `renderSquare(s)` since the squares are now a generated list
   ```jsx
   renderSquare(s) {
       // Add the parentheses so JS doesn't insert a semicolon after return and break our code
       return (
           <Square 
               // We're passing 2 props from Game > Board > Square: value and onClick
               value={this.props.squares[s]}
               onClick={() => this.props.onClick(s)}
               // Added key since squares is now a rendered list
               key={s}
           />
       );
   }
   
2. First loop into 3 rows, define each as `row,` which is used as a key
3. Loop into 3 columns, define each as `column,` rendering each square using the formula 3 * row + column

   ```jsx
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

---

### 4. Add a toggle button that lets you sort the moves in either ascending or descending order
**Commit:** [Wrapping Up: History Sorting Toggle Button](https://github.com/agnes-nuguid/react-tutorial/commit/e4d4eef0fa6a8678f52ed76a06920f6b4c4f128d)

**Ascending:**

![image](https://user-images.githubusercontent.com/22828458/74820753-7fc5c780-533d-11ea-8d03-28820eb36caa.png)

**Descending:**

![image](https://user-images.githubusercontent.com/22828458/74820771-86ecd580-533d-11ea-8e5f-7caa55ee6a21.png)

1. Changed the `ol, ul` class to `.history` in `index.css`

    ```css ol, ul {
   .history {
       padding-left: 30px;
   }
   
2. Defined a new state: `sortingIsAsc`

   ```jsx
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

3. `handleSorting()` flips the Boolean value of the current `sortingIsAsc` value
    ``` jsx
    handleSorting() {
        this.setState({
            // Flips sortIsAsc boolean value every time the sort button is clicked
            sortingIsAsc: !this.state.sortingIsAsc
        });
    }
    
4. Defined arrow in `render()` to display the directional arrow depending on `this.state.sortingIsAsc`

   ```jsx
    if (this.state.sortingIsAsc) {
        moves.sort();
        arrow = '↑';
    } else {
        moves.reverse();
        arrow = '↓';
    }

5. Added a Sort button with the arrow changing set in step 4

   ```jsx
   return (
      <div className="game">
          <div className="game-board">
              <Board 
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
              />
          </div>

---

### 5. When someone wins, highlight the three squares that caused the win
**Commit:** [Wrapping Up: Highlight Winning Squares](https://github.com/agnes-nuguid/react-tutorial/commit/0a3cf72d9e1835f36fbc8c3580ce71504a36d311)

![image](https://user-images.githubusercontent.com/22828458/74820684-6755ad00-533d-11ea-8679-020b95a02b58.png)

**index.css**
- Added `.winner` class with `background: #9fffe0;`

  ``` css
  .winner {
      background: #9fffe0;
  }

**index.js**
`calculateWinner()`
- now outputs an array containing the value of the winning square, and the squares that won `[squares[a], lines[i]]`

  ``` jsx
  return [squares[a], lines[i]];

`Game`
1. The winner displayed will be `winner[0]` (`'X'` | `'O'` | `null`)

   ``` jsx
   // Status shows if there is a winner:
   if(winner) {
       status = 'Winner is: ' + winner[0];

2. `winner[1]` will be passed on to Boards as `winningSquares` if there is a winner
    
    ```jsx
    return (
        <div className="game">
            <div className="game-board">
                <Board 
                    squares={current.squares}
                    // Pass on the winning squares if there is a winner
                    winningSquares={winner ? winner[1] : []}

`Board`
- `className` is defined in `renderSquare(s),` passing on` 'square winner'` if s is included in `this.props.winningSqaures` or just `'square'` if not

  ```jsx
  renderSquare(s) {
      // Add the parentheses so JS doesn't insert a semicolon after return and break our code
      return (
          <Square 
              // Will check if the square is included in the winning combination
              className={this.props.winningSquares.includes(s) ? 'square winner' : 'square'}
              // We're passing 2 props from Game > Board > Square: value and onClick
              value={this.props.squares[s]}

`Square`
- `className` will be determined by what was passed on from `Board.` `'square'` | `'square winner'`

  ```jsx
  function Square(props) {
    return (
        
        <button 
            // either 'square' | 'square winner'
            className={props.className}

---

### 6. When no one wins, display a message about the result being a draw
**Commit:** [Wrapping Up: Display Message of a Draw](https://github.com/agnes-nuguid/react-tutorial/commit/c987b25fc200b44bab9713705f98c247b9cbddfa)

![image](https://user-images.githubusercontent.com/22828458/74820574-3ecdb300-533d-11ea-888e-0fed693a367a.png)

Easiest so far. Just added a condition that if there is no winner, and it's already `stepNumber` 9 (the board is filled up) `status` will display `'It's a draw!'`

```jsx
if(winner) {
    status = 'Winner is: ' + winner[0];
// If the board is already filled up and no winner
} else if(this.state.stepNumber === 9) {
    status = 'It\'s a draw!' ; 
```

## `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
