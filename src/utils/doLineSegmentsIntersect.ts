import { Coordinate } from "ol/coordinate";

const orientation = (p: Coordinate, q: Coordinate, r: Coordinate) => {
  const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
  if (val === 0) return 0;
  return val > 0 ? 1 : 2;
};

const onSegment = (p: Coordinate, q: Coordinate, r: Coordinate) => {
  return (
    q[0] <= Math.max(p[0], r[0]) &&
    q[0] >= Math.min(p[0], r[0]) &&
    q[1] <= Math.max(p[1], r[1]) &&
    q[1] >= Math.min(p[1], r[1])
  );
};

export const doLineSegmentsIntersect = (
  p: Coordinate,
  p2: Coordinate,
  q: Coordinate,
  q2: Coordinate
) => {
  const o1 = orientation(p, p2, q);
  const o2 = orientation(p, p2, q2);
  const o3 = orientation(q, q2, p);
  const o4 = orientation(q, q2, p2);

  if (o1 !== o2 && o3 !== o4) {
    return true;
  }

  if (o1 === 0 && onSegment(p, q, p2)) return true;
  if (o2 === 0 && onSegment(p, q2, p2)) return true;
  if (o3 === 0 && onSegment(q, p, q2)) return true;
  if (o4 === 0 && onSegment(q, p2, q2)) return true;

  return false;
};
