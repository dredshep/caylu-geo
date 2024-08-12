import { Coordinate } from "ol/coordinate";
import { doLineSegmentsIntersect } from "@/utils/doLineSegmentsIntersect";

export const isValidPolygon = (coordinates: Coordinate[]) => {
  for (let i = 0; i < coordinates.length - 1; i++) {
    for (let j = i + 1; j < coordinates.length - 1; j++) {
      if (
        doLineSegmentsIntersect(
          coordinates[i],
          coordinates[(i + 1) % coordinates.length],
          coordinates[j],
          coordinates[(j + 1) % coordinates.length]
        )
      ) {
        return false;
      }
    }
  }
  return true;
};
