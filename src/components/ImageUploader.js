import { useState } from "react";

export default function ImageUploader() {
  const [images, setImages] = useState([]);
  const [positions, setPositions] = useState({});
  const [sizes, setSizes] = useState({});

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...imageUrls]);
  };

  const handleDrag = (index, event) => {
    setPositions(prev => ({
      ...prev,
      [index]: { x: event.clientX, y: event.clientY }
    }));
  };

  const handleSizeChange = (index, event) => {
    setSizes(prev => ({
      ...prev,
      [index]: event.target.value
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Upload and Adjust Images</h1>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="mb-4 border p-2 rounded"
      />
      <div className="flex flex-wrap gap-4 mt-4 relative">
        {images.map((image, index) => (
          <div key={index} style={{ position: "absolute", left: positions[index]?.x || 0, top: positions[index]?.y || 0 }} draggable onDragEnd={(event) => handleDrag(index, event)}>
            <input
              type="range"
              min="50"
              max="300"
              value={sizes[index] || 100}
              onChange={(event) => handleSizeChange(index, event)}
              className="block mb-2"
            />
            <img
              src={image}
              alt={`Uploaded Preview ${index}`}
              style={{ width: `${sizes[index] || 100}px`, height: "auto" }}
              className="rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}