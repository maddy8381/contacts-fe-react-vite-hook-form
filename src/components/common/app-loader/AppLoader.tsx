import React from 'react';
import { LoaderContainer, LoaderOverlay, LoaderText, Spinner } from './style';
import { useLoader } from '../../../context/loader/useLoader';

const AppLoader: React.FC = () => {
  const { isLoading, loadingMessage } = useLoader();

  if (!isLoading) return null;

  return (
    <LoaderOverlay>
      <LoaderContainer>
        <Spinner />
        <LoaderText>{loadingMessage || 'Loading...'}</LoaderText>
      </LoaderContainer>
    </LoaderOverlay>
  );
};

export default AppLoader;
