class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(source, destination) {
    if (!this.adjacencyList[source]) {
      this.addVertex(source);
    }
    if (!this.adjacencyList[destination]) {
      this.addVertex(destination);
    }

    this.adjacencyList[source].push(destination);
    this.adjacencyList[destination].push(source);
  }

  removeEdge(source, destination) {
    this.adjacencyList[source] = this.adjacencyList[source].filter(
      vertex => vertex !== destination
    );
    this.adjacencyList[destination] = this.adjacencyList[destination].filter(
      vertex => vertex !== source
    );
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex]) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  bfsTraversal(start) {
    let queue = [start];
    let result = [];
    let visited = [];
    visited[start] = true;
    let currentVertex = null;
    while (queue.length) {
      // Remove item from the beginning of a queue
      currentVertex = queue.shift();
      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          // Add item to the end of a queue
          queue.push(neighbor);
        }
      });
    }
    return result;
  }

  dfsTraversalRecursive(start) {
    let result = [];
    let visited = [];
    let adjacencyList = this.adjacencyList;
    (function dfsRecursive(vertex) {
      if (!vertex) {
        return null;
      }
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          return dfsRecursive(neighbor);
        }
      });
    })(start);
    return result;
  }

  dfsTraversalIterative(start) {
    let result = [];
    let stack = [start];
    let visited = [];
    visited[start] = true;
    let currentVertex;
    while (stack.length) {
      // Remove an item from the end of a stack
      currentVertex = stack.pop();
      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
    return result;
  }
}

const graph = new Graph();

graph.addEdge(1, 2);
graph.addEdge(1, 4);

graph.addEdge(2, 3);

graph.addEdge(3, 4);
graph.addEdge(3, 5);

graph.addEdge(5, 6);
graph.addEdge(5, 7);

console.log("BFS: " + graph.bfsTraversal(1));
console.log("DFSRec: " + graph.dfsTraversalRecursive(1));
console.log("DFSIter: " + graph.dfsTraversalIterative(1));
