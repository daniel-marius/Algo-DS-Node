// Let A be a 2D array whose entries are either W or B.
// Write a program that takes A, and replaces all Ws that cannot reach the boundary with a B.

class EnclosedRegions {
  constructor(board) {
    this.board = board;
  }

  isFeasible(visited, neighbor) {
    let x = neighbor[0],
      y = neighbor[1];
    return (
      x >= 0 &&
      x < this.board.length &&
      y >= 0 && y < this.board[x].length &&
      this.board[x][y] == "W"
    );
  }

  markBoundaryRegion(i, j, visited) {
    // Start with a boundary W entry
    // Traverse the grid using BFS
    // Mark the feasible entries as true
    let directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0]
    ];
    const queue = [];
    queue.push([i, j]);
    visited[i][j] = true;
    let currentPosition, neighbor;
    while (queue.length) {
      currentPosition = queue.shift();
      for (const direction of directions) {
        neighbor = [i + direction[0], j + direction[1]];
        if (this.isFeasible(visited, neighbor)) {
          visited[neighbor[0]][neighbor[1]] = true;
          queue.push(neighbor);
        }
      }
    }
  }

  fillSurroundedRegions() {
    // 1. Initialize a 'visited' array of same length as the input array pre-filled with 'false' values
    // 2. Start at the boundary entries
    // 3. If the boundary entry is a W entry and unmarked:
    //   Call markBoundaryRegion function
    // 4. Iterate through A and change the unvisited W entry to B

    if (!this.board.length) {
      return;
    }

    const numRows = this.board.length,
      numCols = this.board[0].length;
    let visited = [];

    for (let i = 0; i < numRows; i++) {
      visited.push(new Array(numCols).fill(false, 0, numCols));
    }

    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i][0] === "W" && !visited[i][0]) {
        this.markBoundaryRegion(i, 0, visited);
      }

      if (
        this.board[i][this.board.length - 1] === "W" &&
        !visited[i][this.board.length - 1]
      ) {
        this.markBoundaryRegion(i, this.board.length - 1, visited);
      }
    }

    for (let j = 0; j < this.board[0].length; j++) {
      if (this.board[0][j] === "W" && !visited[0][j]) {
        this.markBoundaryRegion(0, j, visited);
      }

      if (
        this.board[this.board.length - 1][j] === "W" &&
        !visited[this.board.length - 1][j]
      ) {
        this.markBoundaryRegion(this.board.length - 1, j, visited);
      }
    }

    for (let i = 1; i < this.board.length - 1; i++) {
      for (let j = 1; j < this.board.length - 1; j++) {
        if (this.board[i][j] == "W" && !visited[i][j]) {
          this.board[i][j] = "B";
        }
      }
    }

    return board;
  }
}

let board = [
  ["B", "B", "B", "B"],
  ["W", "B", "W", "B"],
  ["B", "W", "W", "B"],
  ["B", "B", "B", "B"]
];

const regions = new EnclosedRegions(board);
console.log(regions.fillSurroundedRegions());
