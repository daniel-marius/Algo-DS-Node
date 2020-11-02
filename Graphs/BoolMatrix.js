// Implement a routine that takes an n X m Boolean array A together with an entry (x, y) and flips the color of the region associated with (x, y).

class BoolMatrix {
  constructor(image) {
    this.image = image;
  }

  isFeasible(indices, color) {
    let x = indices[0],
      y = indices[1];
    return (
      x >= 0 &&
      x < this.image.length &&
      y >= 0 && y < this.image[x].length &&
      image[x][y] == color
    );
  }

  flipColor(x, y) {
    // Start at the passed coordinates and store the color
    // Initialize queue
    // Add starting position to queue
    // While Queue is not empty:
    //   - Dequeue and store current position
    //   - Move to the top cell
    //     1. Check if cell is feasible
    //     2. If feasible,
    //       - Flip color
    //       - Enqueue cell
    //     3. Repeat steps 1-2 for the other 3 directions
    let directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0]
    ];
    let color = this.image[x][y];
    let queue = [];
    this.image[x][y] = Number(!color);
    queue.push([x, y]);
    let currentPosition, neighbor;
    while (queue.length) {
      currentPosition = queue.shift();
      for (let direction of directions) {
        neighbor = [
          currentPosition[0] + direction[0],
          currentPosition[1] + direction[1]
        ];
        if (this.isFeasible(neighbor, color)) {
          this.image[neighbor[0]][neighbor[1]] = Number(!color);
          queue.push([neighbor[0], neighbor[1]]);
        }
      }
    }
    return image;
  }
}

let image = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1]
];

let boolmatrix = new BoolMatrix(image);

// [1, 1] - starting point
console.log(boolmatrix.flipColor(1, 1));
