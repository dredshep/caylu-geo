import React, { useState } from "react";
import MapComponent from "@/components/MapComponent";
import PolygonControls from "@/components/PolygonControls";
import MarkerInfo from "@/components/MarkerInfo";
import ModeToggle from "@/components/ModeToggle"; // Import the ModeToggle component
import { Coordinate } from "ol/coordinate";
import { Area } from "@/types/Area";

const Home: React.FC = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [markerPosition, setMarkerPosition] = useState<Coordinate | null>(null);
  const [markerInside, setMarkerInside] = useState<boolean | null>(null);
  const [refreshMap, setRefreshMap] = useState(false);
  const [mode, setMode] = useState<string>("browse"); // Manage the current mode

  const saveCurrentArea = (coordinates: Coordinate[]) => {
    // Save the polygon to areas state
    const newArea = { id: areas.length + 1, coordinates };
    setAreas([...areas, newArea]);
  };

  const refreshPolygons = () => {
    setAreas([]);
    setRefreshMap(true);
    setTimeout(() => setRefreshMap(false), 0); // Reset after refresh
  };

  const refreshMarker = () => {
    setMarkerPosition(null);
    setMarkerInside(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center py-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">
        Customizable Polygons
      </h1>
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6 w-full max-w-4xl">
        <ModeToggle currentMode={mode} setMode={setMode} />{" "}
        {/* Add ModeToggle */}
        <MapComponent
          mode={mode} // Pass the current mode to the MapComponent
          onPolygonDrawn={saveCurrentArea}
          onMarkerSet={(position, inside) => {
            setMarkerPosition(position);
            setMarkerInside(inside);
          }}
          areas={areas}
          refreshMap={refreshMap}
        />
        <MarkerInfo
          markerPosition={markerPosition}
          markerInside={markerInside}
        />
        <PolygonControls
          refreshPolygons={refreshPolygons}
          refreshMarker={refreshMarker}
        />
      </div>
    </div>
  );
};

export default Home;
