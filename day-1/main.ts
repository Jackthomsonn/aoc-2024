(() => {
  const determineDistance = (left: number, right: number) => {
    if (right > left) {
      return right - left;
    }
    return left - right;
  }

  const detemineSimilarityScore = (left: number[], right: number[]) => {
    const calculation: number[] = [];
    for (let i = 0; i < left.length; ++i) {
      const number_of_times = right.filter(r => r === left[i]).length;
      calculation.push(left[i] * number_of_times);
    }
    return calculation;
  }

  const findSmallestPairAndAdd = (left: number[], right: number[], calculation: number[]) => {
    if (left.length === 0 && right.length === 0) {
      return calculation;
    }

    const smallest_left_number = Math.min(...left);
    const smallest_right_number = Math.min(...right);
    const left_index = left.indexOf(smallest_left_number);
    const right_index = right.indexOf(smallest_right_number);
    calculation.push(determineDistance(smallest_left_number, smallest_right_number));
    left.splice(left_index, 1);
    right.splice(right_index, 1);

    return findSmallestPairAndAdd(left, right, calculation);
  }

  const decoder = new TextDecoder("utf-8");
  const input = Deno.readFileSync("input.txt");
  const puzzle_pieces = decoder.decode(input);
  const left: number[] = [];
  const right: number[] = [];
  const split_pieces = puzzle_pieces.trim().split(/\s+/);
  for (let i = 0; i < split_pieces.length; ++i) {
    if (i % 2 === 0) {
      left.push(parseInt(split_pieces[i]));
    } else {
      right.push(parseInt(split_pieces[i]));
    }
  }
  const similarity_score = detemineSimilarityScore(left, right);
  const smallest_pair = findSmallestPairAndAdd(left, right, []);
  console.log({
    similarity_score: similarity_score.reduce((a, b) => a + b, 0),
    smallest_pair: smallest_pair.reduce((a, b) => a + b, 0)
  });
})();