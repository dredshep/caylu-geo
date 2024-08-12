import { Coordinate } from "ol/coordinate";
import React from "react";

interface MarkerInfoProps {
  markerPosition: Coordinate | null;
  markerInside: boolean | null;
}

const MarkerInfo: React.FC<MarkerInfoProps> = ({
  markerPosition,
  markerInside,
}) => {
  return (
    markerInside !== null &&
    markerPosition &&
    markerPosition && (
      <p className="mt-4 text-gray-200">
        Marker Position: {JSON.stringify(markerPosition)} -{" "}
        {markerInside ? (
          <span className="text-green-400">Inside Polygon</span>
        ) : (
          <span className="text-red-400">Outside Polygon</span>
        )}
      </p>
    )
  );
};

export default MarkerInfo;
