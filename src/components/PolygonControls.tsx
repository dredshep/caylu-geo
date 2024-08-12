import React from "react";

interface PolygonControlsProps {
  refreshPolygons: () => void;
  refreshMarker: () => void;
}

const PolygonControls: React.FC<PolygonControlsProps> = ({
  refreshPolygons,
  refreshMarker,
}) => {
  return (
    <div>
      <button
        onClick={refreshPolygons}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-500"
      >
        Refresh Polygons
      </button>
      <button
        onClick={refreshMarker}
        className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 ml-4 hover:bg-green-500"
      >
        Refresh Marker
      </button>
    </div>
  );
};

export default PolygonControls;
