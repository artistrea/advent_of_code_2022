const fs = require("fs");
const path = require("path");

const directions = ["U", "D", "R", "L"];
type Direction = typeof directions[number];

const file: string = fs.readFileSync(path.join(__dirname, "test.txt"), "utf8");
const lines = file.split("\n");

const visited = new Map();

type Coordinate = {
  x: number;
  y: number;
};

const headPosition: Coordinate = {
  x: 0,
  y: 0,
};

const tailPosition = headPosition;

type PositionsMap = Map<Coordinate["x"], Coordinate["y"]>;

type directionsToOpType = {
  [Property in typeof directions[number]]: (
    coord: Coordinate,
    arg: number
  ) => any;
};

const directionToOp: directionsToOpType = {
  U: (coord, arg) => (coord.y += arg),
  D: (coord, arg) => (coord.y -= arg),
  R: (coord, arg) => (coord.x += arg),
  L: (coord, arg) => (coord.x -= arg),
};

function runOperation(
  op: typeof directions[number],
  arg: Coordinate["x"] | Coordinate["y"]
) {
  const prevHeadPos = { ...headPosition };

  return;
}

function isDirection(op: string): op is Direction {
  return directions.includes(op);
}

for (const line of lines) {
  const [op, arg] = line.split(" ");

  if (directions.includes(op)) {
    throw new Error(`Invalid operation ${op}`);
  }

  runOperation(op, arg);
}
