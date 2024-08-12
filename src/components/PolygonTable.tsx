import React from "react";
import { Coordinate } from "ol/coordinate";
import { Polygon } from "ol/geom";
import { fromLonLat, toLonLat } from "ol/proj";

interface PolygonTableProps {
  markerPosition: Coordinate | null;
  polygons: { id: string; coordinates: Coordinate[] }[];
  onRemovePolygon: (id: string) => void;
}

const PolygonTable: React.FC<PolygonTableProps> = ({
  markerPosition,
  polygons,
  onRemovePolygon,
}) => {
  const isPointInPolygon = (
    point: Coordinate,
    polygonCoordinates: Coordinate[]
  ) => {
    // Convert point to map projection if necessary
    const pointInMapProjection = fromLonLat(point);

    // Create a polygon in map projection
    const polygon = new Polygon([
      polygonCoordinates.map((coord) => fromLonLat(coord)),
    ]);

    // Perform the intersection check
    return polygon.intersectsCoordinate(pointInMapProjection);
  };

  return (
    <div className="mt-4">
      <h3 className="text-gray-200">Polygon Status Table</h3>
      <table className="min-w-full mt-2 text-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2">Polygon ID</th>
            <th className="px-4 py-2">Coordinates</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {polygons.map((polygon) => (
            <tr key={polygon.id}>
              <td className="border px-4 py-2">{polygon.id}</td>
              <td className="border px-4 py-2">
                {polygon.coordinates.map((coord, index) => {
                  const lonLat = coord; // Coordinates already in lon/lat
                  return (
                    <div key={index}>
                      [{lonLat[0].toFixed(6)}, {lonLat[1].toFixed(6)}]
                    </div>
                  );
                })}
              </td>
              <td className="border px-4 py-2">
                {markerPosition &&
                isPointInPolygon(markerPosition, polygon.coordinates) ? (
                  <span className="text-green-400">Inside</span>
                ) : (
                  <span className="text-red-400">Outside</span>
                )}
              </td>
              <td className="border px-4 py-2">
                <button
                  className="text-red-400 hover:text-red-600"
                  onClick={() => onRemovePolygon(polygon.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolygonTable;
