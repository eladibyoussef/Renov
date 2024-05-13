import React, { useEffect } from 'react';
import ServiceCard from '../components/serviceCard/serviceCard';
import TitleServices from '../components/titleServices/titleServices';
import ProRonova from '../components/ProRenove/ProRonova';
import { fetchServices, selectAllServices } from '../features/services/servicesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const PageServices: React.FC = () => {
  const dispatch = useAppDispatch();
  const services = useAppSelector(selectAllServices);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <div>
      <TitleServices />
      <div className='grid grid-cols-3'>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <ProRonova />
    </div>
  );
};

export default PageServices;
