import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import Draw from "ol/interaction/Draw";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import Polygon from "ol/geom/Polygon";
import { fromLonLat } from "ol/proj";
import { Coordinate } from "ol/coordinate";
import { Point } from "ol/geom";
import { Style, Icon, Circle, Fill, Stroke } from "ol/style";
import { setupMap } from "@/utils/mapSetup";
import { Area } from "@/types/Area";

interface MapComponentProps {
  mode: string; // New prop for mode
  onPolygonDrawn: (coordinates: Coordinate[]) => void;
  onMarkerSet: (position: Coordinate, insidePolygon: boolean) => void;
  areas: Area[];
  refreshMap: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  mode,
  onPolygonDrawn,
  onMarkerSet,
  areas,
  refreshMap,
}) => {
  const mapRef = useRef<Map | null>(null);
  const drawRef = useRef<Draw | null>(null);
  const sourceRef = useRef(new VectorSource());
  const markerRef = useRef(new VectorSource());
  const modeRef = useRef(mode); // Ref to store the current mode

  // Update modeRef whenever mode changes
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    console.log("mode:", mode);
    if (!mapRef.current) {
      mapRef.current = setupMap("map", sourceRef, markerRef);

      // Initialize the drawing interaction for polygons
      drawRef.current = new Draw({
        source: sourceRef.current,
        type: "Polygon",
      });

      // Add the draw interaction to the map
      mapRef.current.addInteraction(drawRef.current);

      // Handle polygon drawing
      drawRef.current.on("drawend", (event) => {
        const feature = event.feature;
        const polygon = feature.getGeometry() as Polygon;
        const coordinates = polygon
          .getCoordinates()[0]
          .map((coord) => fromLonLat(coord) as Coordinate);
        onPolygonDrawn(coordinates); // Notify parent component of the new polygon
      });

      // Set up click handler for placing markers
      mapRef.current.on("singleclick", (event) => {
        console.log(
          "Map clicked at",
          event.coordinate,
          "mode:",
          modeRef.current
        ); // Use modeRef.current
        if (modeRef.current === "marker") {
          const coordinate = event.coordinate;
          const lonLat = fromLonLat(coordinate) as Coordinate;
          const markerFeature = new Feature(new Point(coordinate));
          console.log("Marker set at", lonLat);

          markerFeature.setStyle(
            new Style({
              image: new Circle({
                radius: 7,
                fill: new Fill({ color: "red" }),
                stroke: new Stroke({
                  color: "white",
                  width: 2,
                }),
              }),
            })
          );

          markerRef.current.clear(); // Clear previous markers
          markerRef.current.addFeature(markerFeature);

          // Check if the point is inside any polygon
          const inside = areas.some((area) => {
            const poly = new Polygon([
              area.coordinates.map((coord) => fromLonLat(coord)),
            ]);
            return poly.intersectsCoordinate(coordinate);
          });

          onMarkerSet(lonLat, inside);
        }
      });
    } else if (refreshMap) {
      sourceRef.current.clear();
      markerRef.current.clear();
      areas.forEach((area) => {
        const polygon = new Polygon([
          area.coordinates.map((coord) => fromLonLat(coord)),
        ]);
        const feature = new Feature(polygon);
        sourceRef.current.addFeature(feature);
      });
    }

    // Manage interaction activation based on the mode
    if (mapRef.current && drawRef.current) {
      drawRef.current.setActive(mode === "draw");
    }
  }, [areas, refreshMap, mode, onPolygonDrawn, onMarkerSet]);

  return (
    <div
      id="map"
      className="w-full h-96 rounded-lg shadow-lg bg-gray-800"
    ></div>
  );
};

export default MapComponent;
