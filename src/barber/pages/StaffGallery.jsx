import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';

const StaffGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageToEdit, setImageToEdit] = useState(null);



  const {response, error, loading, request} = useAxios();

  useEffect(() => {
    // Ambil data gambar dari API
    const fetchImages = async () => {
      try {
        const response = await request('/gallery-image');
        console.log(response)
        // setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleImageUpload = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('image', selectedImage);
    
    try {
      const response = await fetch('/gallery-image', {
        method: 'POST',
        body: formData,
      });

      console.log(response);

      setImages(response.data);
      setSelectedImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageEdit = async (imageId) => {
    // Ambil data gambar untuk diedit
    const image = images.find(img => img.id === imageId);
    setImageToEdit(image);
  };

  const handleImageUpdate = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (selectedImage) {
      formData.append('image', selectedImage);
    }
    
    try {
      await axios.patch(`/gallery-image/${imageToEdit.id}`, formData, { 
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Refresh gambar setelah update
      const response = await axios.get('/api/images');
      setImages(response.data);
      setImageToEdit(null);
      setSelectedImage(null);
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      await axios.delete(`/gallery-image/${imageId}`);
      
      // Refresh gambar setelah delete
      const response = await axios.get('/api/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className='w-full px-4'>
      <h2 className='text-xl font-semibold mb-4'>Staff Gallery</h2>

      <div className='mb-6'>
        <form onSubmit={handleImageUpload}>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className='mb-4'
          />
          <button
            type='submit'
            disabled={!selectedImage}
            className='px-4 py-2 bg-blue-500 text-white rounded'
          >
            Upload Image
          </button>
        </form>
      </div>

      {imageToEdit && (
        <div className='mb-6'>
          <h3 className='text-lg font-semibold mb-2'>Edit Image</h3>
          <form onSubmit={handleImageUpdate}>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className='mb-4'
            />
            <button
              type='submit'
              disabled={!selectedImage && !imageToEdit}
              className='px-4 py-2 bg-green-500 text-white rounded'
            >
              Update Image
            </button>
          </form>
        </div>
      )}

      <div className='grid grid-cols-3 gap-4'>
        {images.map((image) => (
          <div key={image.id} className='relative w-full h-40 bg-gray-200'>
            <img
              src={image.url}
              alt={image.description}
              className='w-full h-full object-cover'
            />
            <div className='absolute top-0 right-0 p-2'>
              <button
                onClick={() => handleImageEdit(image.id)}
                className='bg-yellow-500 text-white px-2 py-1 rounded mr-2'
              >
                Edit
              </button>
              <button
                onClick={() => handleImageDelete(image.id)}
                className='bg-red-500 text-white px-2 py-1 rounded'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffGallery;
