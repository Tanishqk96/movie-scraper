import React, { useEffect, useState } from "react";
import axios from "axios";

const Cricket = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://google-search72.p.rapidapi.com/imagesearch",
          {
            params: { q: "cricket match latest" },
            headers: {
              "x-rapidapi-key": "53c96ff072msh2ce28742151e066p1c027ajsnc658f4b96a97",
              "x-rapidapi-host": "google-search72.p.rapidapi.com",
            },
          }
        );
console.log(response.data.items[0].originalImageUrl);
        // Extract relevant images from response
        setData(response.data.items || []);
      } catch (err) {
        setError("Failed to fetch images. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="p-4 bg-gray-100">
    <h1 className="text-xl font-bold mb-4">Cricket Photo Gallery</h1>
    {loading && <p>Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
    
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.length > 0 ? (
        data.map((image, index) => (
          <div key={index} className="bg-white p-2 rounded-lg shadow">
            <img
              src={image.originalImageUrl}  // ✅ Correct way to fetch images
              alt={image.title || "Cricket Image"}
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-sm text-gray-600 mt-2">{image.title}</p>
          </div>
        ))
      ) : (
        !loading && <p>No images found.</p>
      )}
    </div>
  </div>
  );
};

export default Cricket;
