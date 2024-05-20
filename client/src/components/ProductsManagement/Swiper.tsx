import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shadcn/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useAppDispatch } from '@/store/hooks';
import { deleteFile, fetchProducts } from '@/features/product/productSlice';
import { TiDelete } from "react-icons/ti";
import '../../App.css';
import { MdAddPhotoAlternate } from "react-icons/md";
import UploadWidget from '../UploadWidget';

const Swiper = ({ photos, editMode , setEditedProduct , editedProduct  }) => {
  const dispatch = useAppDispatch();
  const [localPhotos, setLocalPhotos] = useState(photos);
  const [deletingPhotoId, setDeletingPhotoId] = useState(null);

  useEffect(() => {
    setLocalPhotos(editedProduct.photos);
    console.log('inside localphotos use effect');
    
  }, [photos]);

  useEffect(() => {
    setEditedProduct((prevProduct: any) => ({
      ...prevProduct,
      photos: localPhotos,
    }));
  }, [localPhotos, setEditedProduct]);

  const onDeleteClick = async (photo) => {
    setDeletingPhotoId(photo.cloudinaryId);
    const response = await dispatch(deleteFile(photo));
    if (deleteFile.fulfilled.match(response)) {
      setTimeout(() => {
        setLocalPhotos((prevPhotos: any[]) => prevPhotos.filter((p) => p.cloudinaryId !== photo.cloudinaryId));
        setDeletingPhotoId(null);
      }, 500); 
    }

  };

  
 
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      {/* <div>
      <UploadWidget
              customElement={            <MdAddPhotoAlternate />
            }
              onUploadSuccess={handleUploadSuccess}
            />

      </div> */}
       
      <CarouselContent>

        {localPhotos.map((photo) => (
          <CarouselItem key={photo.cloudinaryId} className="relative">
            <img
              src={photo.url}
              alt={photo.url}
              style={{ height: 255, width: 255 }}
              id={photo.cloudinaryId}
              className={deletingPhotoId === photo.cloudinaryId ? 'deleted' : ''}
            />
            {editMode && (
              <div>
                <TiDelete className="absolute top-0 right-5" onClick={() => onDeleteClick(photo)} />
              </div>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Swiper;
