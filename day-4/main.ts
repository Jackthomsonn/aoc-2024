const findXmas = (grid: string[][]) => {
  const ROTATION_COUNT = 4;

  let count = 0;

  for (let rotations = 0; rotations < ROTATION_COUNT; rotations++) {
    for (let i = 0; i < grid.length - 2; i++) {
      for (let j = 0; j < grid[i].length - 2; j++) {
        const isMatch =
          grid[i][j] === 'M' && // Check if the top-left corner is 'M'
          grid[i][j + 2] === 'S' && // Check if the top-right corner is 'S'
          grid[i + 1][j + 1] === 'A' && // Check if the middle element is 'A'
          grid[i + 2][j] === 'M' && // Check if the bottom-left corner is 'M'
          grid[i + 2][j + 2] === 'S'; // Check if the bottom-right corner is 'S'

        if (isMatch) {
          count++;
        }
      }
    }

    const rotatedGrid = grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));

    grid.length = 0;
    rotatedGrid.forEach(row => grid.push(row.reverse()));
  }

  console.log(count);
};

const decoder = new TextDecoder();
const input = Deno.readFileSync("input.txt");
const decodedData = decoder.decode(input);

const grid = decodedData.split('\n').map(line => line.split(''));

findXmas(grid);
