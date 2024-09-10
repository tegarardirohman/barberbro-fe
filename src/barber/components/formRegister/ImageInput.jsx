import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios or use fetch if you prefer
import useAxios from '../../../hooks/useAxios';

export default function ImageInput({ imageUrl }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);


  const { response, error, loading, request } = useAxios();

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Upload image to the server
  const uploadImage = async () => {
    if (!selectedImage) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const res = await request('/barber/profile-picture', 'POST', formData, config);

      console.log(res);

      setUploadSuccess(true);

    } catch (error) {
      setUploadError('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Show image preview when selectedImage changes
  useEffect(() => {
    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="imageInput"
        className="w-40 h-40 aspect-square object-cover flex items-center justify-center border-2 rounded-full cursor-pointer"
        style={{
          backgroundImage: imagePreview ? `url(${imagePreview})` : (imageUrl? `url(${imageUrl})` : 'none'),
          backgroundSize: 'cover',
          backgroundFit: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
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
      <button
        onClick={uploadImage}
        disabled={!selectedImage || uploading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {uploading ? 'Uploading...' : 'Set Image'}
      </button>
      {uploadSuccess && <p className="mt-4 text-green-500">Image uploaded successfully!</p>}
      {uploadError && <p className="mt-4 text-red-500">{uploadError}</p>}
    </div>
  );
}
