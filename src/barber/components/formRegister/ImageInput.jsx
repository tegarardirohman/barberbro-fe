import React, { useState } from 'react';

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="imageInput"
        className="w-40 h-40 flex items-center justify-center border-2 border-dashed rounded cursor-pointer"
        style={{
          backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!imagePreview && <span>Select Image</span>}
      </label>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
