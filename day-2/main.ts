type Direction = "increasing" | "decreasing" | "none";

interface Check {
  value: number;
  direction: Direction;
  difference?: number;
}

const check_safety = (): void => {
  const decoder = new TextDecoder();
  const input = Deno.readFileSync("input.txt");
  const data = decoder.decode(input).trim().split("\n");

  const parse_line_to_checks = (points: number[]): Check[] => {
    const checks: Check[] = [];
    for (let k = 0; k < points.length - 1; ++k) {
      if (points[k] > points[k + 1]) {
        checks.push({
          value: points[k],
          direction: "decreasing",
          difference: points[k] - points[k + 1],
        });
      } else if (points[k] < points[k + 1]) {
        checks.push({
          value: points[k],
          direction: "increasing",
          difference: points[k + 1] - points[k],
        });
      } else {
        checks.push({
          value: points[k],
          direction: "none",
        });
      }
    }
    return checks;
  };

  const is_safe = (row_check: Check[]): boolean => {
    if (row_check.length === 0) return false;

    const initial_direction = row_check[0]?.direction;

    const same_direction = row_check.every(
      (row) => row.direction === initial_direction && row.direction !== "none"
    );

    const all_movements_within_threshold = row_check.every((row) => {
      if (!row.difference) return true;

      return row.difference >= 1 && row.difference <= 3;
    });

    return same_direction && all_movements_within_threshold;
  };

  const can_be_safe_with_dampener = (points: number[]): boolean => {
    for (let i = 0; i < points.length; i++) {
      const modified_points = [...points.slice(0, i), ...points.slice(i + 1)];
      const modified_checks = parse_line_to_checks(modified_points);

      if (is_safe(modified_checks)) {
        return true;
      }
    }
    return false;
  };

  const final_checks = data.map((line): boolean => {
    const points = line.split(" ").map(Number);
    const checks = parse_line_to_checks(points);

    if (is_safe(checks)) return true;
    return can_be_safe_with_dampener(points);
  });

  console.log(final_checks.filter((safe) => safe).length);
};

check_safety();
