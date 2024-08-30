import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

export default function ImageGalleryUploader() {
  const [images, setImages] = useState([]);

  // Handle single image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = {
        file,
        preview: URL.createObjectURL(file),
      };
      setImages((prevImages) => [...prevImages, newImage]);
    }
  };

  // Handle image removal
  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-4 relative">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group"
          >
            <img
              src={image.preview}
              alt={`Selected ${index}`}
              className="w-32 h-32 object-cover rounded"
            />
            <button
              onClick={() => handleImageRemove(index)}
              className="absolute top-0 right-0 bg-red-500 w-10 h-10 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ transform: 'translate(50%, -50%)' }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <input
        type="file"
        id="imageGalleryInput"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <Button onPress={() => document.getElementById('imageGalleryInput').click()} className="mt-4">
        Add Gallery Images
      </Button>
    </div>
  );
}
