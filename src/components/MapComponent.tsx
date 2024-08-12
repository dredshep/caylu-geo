import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, LoadScript, Polygon, Marker } from "@react-google-maps/api";
import { Coordinate } from "@/types/Coordinate";
import { Area } from "@/types/Area";
import { ExportedGoogle } from "@/types/global";

interface MapComponentProps {
  mode: string;
  onPolygonDrawn: (coordinates: Coordinate[]) => void;
  onMarkerSet: (position: Coordinate, insidePolygon: boolean) => void;
  areas: Area[];
  refreshMap: boolean;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.4168, // Default center (Madrid, Spain)
  lng: -3.7038,
};

const MapComponent: React.FC<MapComponentProps> = ({
  mode,
  onPolygonDrawn,
  onMarkerSet,
  areas,
  refreshMap,
}) => {
  const mapRef = useRef<GoogleMap>(null);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [paths, setPaths] = useState<Coordinate[]>([]);

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (mode === "marker" && event.latLng) {
        const position: Coordinate = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        const insidePolygon = areas.some((area) =>
          google.maps.geometry.poly.containsLocation(
            new google.maps.LatLng(position.lat, position.lng),
            new google.maps.Polygon({ paths: area.coordinates })
          )
        );
        onMarkerSet(position, insidePolygon);
      }
    },
    [mode, areas, onMarkerSet]
  );

  const handlePolygonComplete = (polygon: google.maps.Polygon) => {
    const polygonPaths = polygon
      .getPath()
      .getArray()
      .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));
    onPolygonDrawn(polygonPaths);
    setDrawing(false);
    polygon.setMap(null); // remove the drawn polygon after completion
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={handleMapClick}
        ref={mapRef}
      >
        {areas.map((area, index) => (
          <Polygon
            key={index}
            paths={area.coordinates}
            options={{
              fillColor: "lightblue",
              fillOpacity: 0.4,
              strokeColor: "blue",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        ))}

        {mode === "draw" && (
          <google.maps.drawing.DrawingManager
            options={{
              drawingControl: false,
              polygonOptions: {
                fillColor: "lightblue",
                fillOpacity: 0.4,
                strokeColor: "blue",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                editable: true,
              },
              drawingMode: google.maps.drawing.OverlayType.POLYGON,
            }}
            onPolygonComplete={handlePolygonComplete}
          />
        )}

        {mode === "marker" &&
          paths.map((path, index) => <Marker key={index} position={path} />)}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
