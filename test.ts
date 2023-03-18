type EventManipulate<Events extends { kind: string }> = {
  [E in Events as E['kind']]: E;
};

type SquareEvent = { kind: 'square'; x: number; y: number };
type CircleEvent = { kind: 'circle'; radius: number };

type Result = EventManipulate<SquareEvent>;
//       ^?
