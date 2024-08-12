import React, { useState } from "react";
import MapComponent from "@/components/MapComponent";
import PolygonControls from "@/components/PolygonControls";
import MarkerInfo from "@/components/MarkerInfo";
import ModeToggle from "@/components/ModeToggle";
import { Coordinate } from "ol/coordinate";
import { Area } from "@/types/Area";
import PolygonTable from "@/components/PolygonTable";

const Home: React.FC = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [markerPosition, setMarkerPosition] = useState<Coordinate | null>(null);
  const [markerInside, setMarkerInside] = useState<boolean | null>(null);
  const [refreshMap, setRefreshMap] = useState(false);
  const [mode, setMode] = useState<string>("browse");

  const generateUniqueId = () => {
    return `Polygon_${new Date().getTime()}`;
  };

  const saveCurrentArea = (coordinates: Coordinate[]) => {
    const newId = generateUniqueId();
    const newArea: Area = { id: newId, coordinates };
    setAreas((prevAreas) => [...prevAreas, newArea]);
  };

  const refreshPolygons = () => {
    setAreas([]);
    setRefreshMap(true);
    setTimeout(() => setRefreshMap(false), 0);
  };

  const refreshMarker = () => {
    setMarkerPosition(null);
    setMarkerInside(null);
  };

  const removePolygon = (id: string) => {
    setAreas((prevAreas) => prevAreas.filter((area) => area.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center py-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">
        Customizable Polygons
      </h1>
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6 w-full max-w-4xl">
        <ModeToggle currentMode={mode} setMode={setMode} />
        <MapComponent
          mode={mode}
          onPolygonDrawn={saveCurrentArea}
          onMarkerSet={(position, inside) => {
            setMarkerPosition(position);
            setMarkerInside(inside);
          }}
          areas={areas}
          refreshMap={refreshMap}
        />
        <PolygonTable
          markerPosition={markerPosition}
          polygons={areas}
          onRemovePolygon={removePolygon}
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
