const sanitise = (): void => {
  const decoder = new TextDecoder();
  const input = Deno.readFileSync("input.txt");
  const data = decoder.decode(input);
  const instructionRegex = /(mul\(\d+,\d+\)|do\(\)|don't\(\))/g;
  const instructions = data.match(instructionRegex);
  const results: number[] = [];
  let mulEnabled = true;

  instructions?.forEach((instruction) => {
    if (instruction === "do()") {
      mulEnabled = true;
    } else if (instruction === "don't()") {
      mulEnabled = false;
    } else if (instruction.startsWith("mul(")) {
      if (mulEnabled) {
        const numbers = instruction
          .replace("mul(", "")
          .replace(")", "")
          .split(",")
          .map(Number);
        results.push(numbers[0] * numbers[1]);
      }
    }
  });

  const sum = results.reduce((a, b) => a + b, 0);

  console.log(sum);
};

sanitise();
