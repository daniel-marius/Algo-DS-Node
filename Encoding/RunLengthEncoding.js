class RunLengthEncoding {
  static encode(input) {
    let index = 0;
    let runTotal = 0;
    let currentChar = 0;
    let output = '';

    // Looping through the entire source data byte by byte.
    while (index < input.length) {
      runTotal = 0;
      currentChar = input[index];

      // For each byte it keeps track of how many runs are in the sequence
      while ((currentChar === input[index]) && (runTotal < 255)) {
        runTotal += 1;
        index += 1;
      }

      // If the total runs are four or more, the character
      // marker, run total, and value are saved to the destination
      if (runTotal > 3) {
        output += '~';
        output += runTotal;
        output += currentChar;
      } else {
        // If there are fewer than four
        // runs, the value is simply copied to the destination
        for (let i = 0; i < runTotal; i++) {
          output += currentChar;
        }
      }
    }

    return output;
  }

  static decode(input) {
    let index = 0;
    let runTotal = 0;
    let currentChar = 0;
    let output = '';

    while (index < input.length) {
      // If the current character matches the character marker, the next
      // byte is the number of runs followed by the value itself
      if (input[index++] === '~') {
        runTotal = parseInt(input[index++]);
        currentChar = input[index++];

        for (let i = 0; i < runTotal; i++) {
          output += currentChar;
        }
      } else {
        // If the current byte is not a
        // character marker, the byte is simply copied to the destination
        output += input[index - 1];
      }
    }

    return output;
  }
}

const input = "AAAAaaBBBBBBCCCCCCddddddEEEEEeeeeFFFFGGGG";

console.log('Original Data Size: ', input.length);
console.log('Original Data: ', input);

console.log('Compressed Size: ', RunLengthEncoding.encode(input).length);
console.log('Compressed Data: ', RunLengthEncoding.encode(input));

console.log('Decompressed Size: ', RunLengthEncoding.decode(RunLengthEncoding.encode(input)).length);
console.log('Decompressed Data: ', RunLengthEncoding.decode(RunLengthEncoding.encode(input)));
