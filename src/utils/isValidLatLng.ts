export const isValidLatLng = (value: number, type: "lat" | "lng") => {
  if (isNaN(value)) return false;
  if (type === "lat" && (value < -90 || value > 90)) return false;
  if (type === "lng" && (value < -180 || value > 180)) return false;
  return true;
};
