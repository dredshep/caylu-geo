import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MapComponent from "@/components/MapComponent";
import { Coordinate } from "ol/coordinate";

interface Address {
  id: string;
  label: string;
  address: string;
  latitude: string;
  longitude: string;
}

const UserAddresses: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [userName, setUserName] = useState<string>("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [newAddress, setNewAddress] = useState<Address>({
    id: "",
    label: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId as string);
    }
  }, [userId]);

  const fetchUserDetails = async (id: string) => {
    // TODO: Replace with actual API call
    setUserName("John Doe");
    setAddresses([
      {
        id: "1",
        label: "Home",
        address: "123 Main St",
        latitude: "40.7128",
        longitude: "-74.0060",
      },
      {
        id: "2",
        label: "Work",
        address: "456 Elm St",
        latitude: "34.0522",
        longitude: "-118.2437",
      },
    ]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedAddressId(selectedId);
    if (selectedId) {
      const selected = addresses.find((addr) => addr.id === selectedId);
      if (selected) {
        setNewAddress(selected);
      }
    } else {
      setNewAddress({
        id: "",
        label: "",
        address: "",
        latitude: "",
        longitude: "",
      });
    }
  };

  const handleMapClick = (coordinate: Coordinate) => {
    setNewAddress((prev) => ({
      ...prev,
      latitude: coordinate[1].toString(),
      longitude: coordinate[0].toString(),
    }));
    // TODO: Implement reverse geocoding to get address from lat/long
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save address
    // Use JWT for authentication
    console.log("Submitting address:", newAddress);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center py-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">
        {userName}&apos;s Addresses (User ID: {userId})
      </h1>
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6 w-full max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="addressSelect" className="block mb-2">
              Seleccione una dirección registrada o ingrese una nueva
            </label>
            <select
              id="addressSelect"
              value={selectedAddressId}
              onChange={handleAddressSelect}
              className="w-full bg-gray-700 text-white p-2 rounded"
            >
              <option value="">Add a new address</option>
              {addresses.map((addr) => (
                <option key={addr.id} value={addr.id}>
                  {addr.label}: {addr.address}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="label" className="block mb-2">
              Label
            </label>
            <input
              type="text"
              id="label"
              name="label"
              value={newAddress.label}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={newAddress.address}
              onChange={handleInputChange}
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
                name="latitude"
                value={newAddress.latitude}
                onChange={handleInputChange}
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
                name="longitude"
                value={newAddress.longitude}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white p-2 rounded"
                required
              />
            </div>
          </div>
          <MapComponent
            mode="marker"
            onMarkerSet={handleMapClick}
            areas={[]}
            refreshMap={false}
            onPolygonDrawn={() => {}}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-500"
          >
            {selectedAddressId ? "Update Address" : "Add New Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAddresses;
