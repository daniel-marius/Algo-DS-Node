class BFS {
  constructor(graph, root) {
    this.graph = graph;
    this.root = root;
  }

  bfs() {
    let dist = {};

    for (let i = 0; i < this.graph.length; i++) {
      dist[i] = Infinity;
    }

    dist[this.root] = 0;

    let queue = [this.root];
    let current = null;

    while (queue.length != 0) {
      current = queue.shift();

      let currNeighbours = this.graph[current];
      let neighboutIdx = [];
      // The first node connected to the current node
      let idx = currNeighbours.indexOf(1);

      while (idx != -1) {
        neighboutIdx.push(idx);
        // Searching for the next connected node
        idx = currNeighbours.indexOf(1, idx + 1);
      }

      for (let j = 0; j < neighboutIdx.length; j++) {
        if (dist[neighboutIdx[j]] === Infinity) {
          dist[neighboutIdx[j]] = dist[current] + 1;
          queue.push(neighboutIdx[j]);
        }
      }
    }
    return dist;
  }
}

const BFSGraph = [
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0]
];

const BFSRoot = 1;

const graph = new BFS(BFSGraph, BFSRoot);

console.log(graph.bfs());
