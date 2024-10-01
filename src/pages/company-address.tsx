import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MapComponent from "@/components/MapComponent";
import { Coordinate } from "ol/coordinate";

const CompanyAddress: React.FC = () => {
  const router = useRouter();
  const { companyId } = router.query;

  const [companyName, setCompanyName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [previousAddresses, setPreviousAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  useEffect(() => {
    if (companyId) {
      // TODO: Replace with actual API call
      // Fetch company details and previous addresses
      fetchCompanyDetails(companyId as string);
    }
  }, [companyId]);

  const fetchCompanyDetails = async (id: string) => {
    // TODO: Replace with actual API call
    // This is a placeholder for the API call
    setCompanyName("Example Company");
    setPreviousAddresses([
      {
        id: 1,
        address: "123 Main St",
        label: "Main Office",
        lat: "40.7128",
        lng: "-74.0060",
      },
      {
        id: 2,
        address: "456 Elm St",
        label: "Branch Office",
        lat: "34.0522",
        lng: "-118.2437",
      },
    ]);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    // TODO: Implement address autocomplete and lat/long estimation
  };

  const handleMapClick = (coordinate: Coordinate) => {
    setLatitude(coordinate[1].toString());
    setLongitude(coordinate[0].toString());
    // TODO: Reverse geocode to get address from lat/long
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save address
    // Use JWT for authentication
    console.log("Submitting address:", { address, label, latitude, longitude });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center py-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">
        {companyName} (ID: {companyId})
      </h1>
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6 w-full max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="previousAddress" className="block mb-2">
              Seleccione la dirección utilizada anteriormente o cambie la
              dirección a continuación
            </label>
            <select
              id="previousAddress"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded"
            >
              <option value="">Select a previous address</option>
              {previousAddresses.map((addr) => (
                <option key={addr.id} value={addr.id}>
                  {addr.label}: {addr.address}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="label" className="block mb-2">
              Label
            </label>
            <input
              type="text"
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded"
              required
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label htmlFor="latitude" className="block mb-2">
                Latitude
              </label>
              <input
                type="text"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full bg-gray-700 text-white p-2 rounded"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="longitude" className="block mb-2">
                Longitude
              </label>
              <input
                type="text"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full bg-gray-700 text-white p-2 rounded"
                required
              />
            </div>
          </div>
          <MapComponent
            mode="marker"
            onMarkerSet={(position) => handleMapClick(position)}
            areas={[]}
            refreshMap={false}
            onPolygonDrawn={() => {}}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyAddress;
