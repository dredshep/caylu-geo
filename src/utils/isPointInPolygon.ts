import { Coord, booleanPointInPolygon } from "@turf/turf";
import { Polygon } from "geojson";
import { Coordinate } from "ol/coordinate";

export const isPointInPolygon = (point: Coordinate, polygon: Coordinate[]) => {
  const turfPoint = { type: "Point", coordinates: point } as Coord;
  const turfPolygon = {
    type: "Polygon",
    coordinates: [polygon],
  } as Polygon;
  return booleanPointInPolygon(turfPoint, turfPolygon);
};
