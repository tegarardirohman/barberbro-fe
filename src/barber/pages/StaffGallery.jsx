import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useAuth } from '../../context/AuthContext';
import ModalInputGallery from '../components/gallery/ModalInputGallery';
import { getImageUrl } from '../../utils/utils';

const StaffGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageToEdit, setImageToEdit] = useState(null);
  const { response, error, loading, request } = useAxios();
  const { userDetail, refreshUserDetail } = useAuth();

  const fetchImages = async (id) => {
    try {
      const response = await request(`/barbers/${id}/gallery-images`);
      console.log(response)
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {

    if (userDetail) {
      fetchImages(userDetail.id);
    } else {
      refreshUserDetail();
    }
  }, [userDetail]);

  const handleImageDelete = async (imageId) => {
    try {
      const res = await request(`/gallery-image/${imageId}`, 'DELETE');
      
      if (res.statusCode === 200) {
        setImages(images.filter((img) => img.image_id !== imageId));

        toast.success('Image deleted successfully');
      }

    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const onRefresh = () => {
    setTimeout(() => {
      if (userDetail) {
        fetchImages(userDetail.id);
      } else {
        refreshUserDetail();
      }
    }, 1500);
  };

  return (
    <div className="w-full px-8 mt-4">
      <div className="w-full flex justify-between mb-4">
        <h2 className="text-xl font-semibold mb-4">Staff Gallery Image</h2>
        <ModalInputGallery onRefresh={onRefresh} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.length > 0 && images.map((image) => (
          <div
            key={image.image_id}
            className="relative group w-full h-60 bg-gray-200 overflow-hidden"
          >
            <img
              src={getImageUrl(image.path)}
              alt={image.name}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleImageDelete(image.image_id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
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
