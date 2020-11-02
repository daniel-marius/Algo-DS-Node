// Design an algorithm that takes a set of pins and a set of wires connecting pairs of pins, and determines if it is possible to place some pins on the left half of a PCB, and the remainder on the right half, such that each wire is between left and right halves.
// Return such a division, if one exists.

// Model the set as a graph. The pins are represented by the vertices and the wires connecting them are the edges.
// We’ll implement the graph using an edge list.

function isBipartite(graph) {
  // 1. Initialize an array to store uncolored vertices
  // 2. Iterate through all vertices one by one
  // 3. Assign one color (0) to the source vertex
  // 4. Use DFS to reach the adjacent vertices
  // 5. Assign the neighbors a different color (1 - current color)
  // 6. Repeat steps 3 to 5 as long as it satisfies the two-colored     constraint
  // 7. If a neighbor has the same color as the current vertex, break the loop and return false

  let color = [];
  for (let i = 0; i < graph.length; i++) {
    color[i] = -1;
  }
  for (let i = 0; i < graph.length; i++) {
    if (color[i] == -1) {
      let stack = [];
      stack.push(i);
      color[i] = 0;
      let node;
      while (stack.length) {
        node = stack.pop();
        for (const neighbor of graph[node]) {
          if (color[neighbor] === -1) {
            stack.push(neighbor);
            color[neighbor] = 1 - color[node];
          } else if (color[neighbor] == color[node]) {
            return false;
          }
        }
      }
    }
  }
  return true;
}

console.log(
  isBipartite([
    [],
    [2, 4, 6],
    [1, 4, 8, 9],
    [7, 8],
    [1, 2, 8, 9],
    [6, 9],
    [1, 5, 7, 8, 9],
    [3, 6, 9],
    [2, 3, 4, 6, 9],
    [2, 4, 5, 6, 7, 8]
  ])
);
