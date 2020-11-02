// Given a dictionary D and two strings s and f, write a program to determine if s produces t. Assume that all characters are lowercase alphabets.
// If s does produce f, output the length of a shortest production sequence; otherwise, output -1.

// For example, if the dictionary D is
// ["hot", "dot", "dog", "lot", "log", "cog"],
// s is "hit" and t is "cog",
// the length of the shortest production sequence is 5
// "hit" -> "hot" -> "dot" -> "dog" -> "cog"

function transformString(beginWord, endWord, wordList) {
  // 1. Build graph using compareStrings function. Add edges if and only if  the two strings differ by 1 character
  // 2. Run BFS and increment length
  // 3. Return length of production sequence

  let graph = buildGraph(wordList, beginWord);
  if (!graph.has(endWord)) return 0;
  let queue = [beginWord];
  let visited = {};
  visited[beginWord] = true;
  let count = 1;
  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let currentWord = queue.shift();
      if (currentWord === endWord) {
        return count;
      }
      graph.get(currentWord).forEach(neighbor => {
        if (!visited[neighbor]) {
          queue.push(neighbor);
          visited[neighbor] = true;
        }
      });
    }
    count++;
  }
  return 0;
}

function compareStrings(str1, str2) {
  // Compare two strings char by char
  // Return how many chars differ
  
  let diff = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) diff++;
  }
  return diff;
}

function buildGraph(wordList, beginWord) {
  let graph = new Map();
  wordList.forEach(word => {
    graph.set(word, []);
    wordList.forEach(nextWord => {
      if (compareStrings(word, nextWord) == 1) {
        graph.get(word).push(nextWord);
      }
    });
  });
  if (!graph.has(beginWord)) {
    graph.set(beginWord, []);
    wordList.forEach(nextWord => {
      if (compareStrings(beginWord, nextWord) == 1) {
        graph.get(beginWord).push(nextWord);
      }
    });
  }
  return graph;
}
