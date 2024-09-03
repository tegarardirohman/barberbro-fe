import React, { useState } from 'react';
import { Button, Card } from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa6';

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
    <div className="flex flex-col items-center w-full">

      <div className="flex w-full justify-between mb-4">
        <h3 className="text-lg font-bold mb-4">Image Gallery</h3>
        <Button onPress={() => document.getElementById('imageGalleryInput').click()} color="primary" variant='ghost' className="">
          <FaPlus size={20} /> Add Image
        </Button>
      </div>

      <Card className="grid grid-cols-3 gap-4 relative p-4 border-1" shadow='none'>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group border-1 rounded"
          >
            <img
              src={image.preview}
              alt={`Selected ${index}`}
              className="w-full aspect-square object-cover rounded"
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


      </Card>
      <input
        type="file"
        id="imageGalleryInput"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />


    </div>
  );
}
