// Given a 2D array of black and white entries representing a maze with designated entrance and exit points, find a path from the entrance to the exit, if one exists.

class SearchMaze {
  constructor(maze) {
    this.maze = maze;
  }

  isFeasible(indices) {
    // Keep track of is to ensure that we are within the boundaries of the maze all
    let x = indices[0],
      y = indices[1];
    return (
      x >= 0 &&
      x < this.maze.length &&
      y >= 0 && y < this.maze[x].length &&
      this.maze[x][y] === 0
    );
  }

  hasPath(start, destination) {
    // Start at the entry point
    // While exit point has not been reached
    //   1. Move to the top cell
    //   2. Check if position is feasible (white cell & within boundary)
    //   3. Mark cell as visited (turn it into a black cell)
    //   4. Repeat steps 1-3 for the other 3 directions
    this.maze[start[0]][start[1]] = 1;
    return this.searchMazeHelper(start, destination);
  }

  // DFS recursively to traverse the maze
  searchMazeHelper(current, end) {
    if (current[0] === end[0] && current[1] === end[1]) {
      return true;
    }

    let neighborIndices, neighbor;
    // Indices: 0->top, 1->right, 2->bottom, 3->left
    let directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0]
    ];

    for (let direction of directions) {
      neighborIndices = [current[0] + direction[0], current[1] + direction[1]];
      if (this.isFeasible(neighborIndices)) {
        this.maze[neighborIndices[0]][neighborIndices[1]] = 1;
        if (this.searchMazeHelper(neighborIndices, end)) {
          return true;
        }
      }
    }
    return false;
  }
}

// White entries with 0’s and black entries with 1’s
let maze = [
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0]
];

const searchmaze = new SearchMaze(maze);

// Entry point: [0, 4], [3, 2]
console.log(searchmaze.hasPath([0, 4], [3, 2]));
