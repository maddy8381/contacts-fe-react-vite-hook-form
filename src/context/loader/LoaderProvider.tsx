import React, { useState, type ReactNode } from 'react';
import { LoaderContext } from '../loader/LoaderContext';

interface LoaderProviderProps {
  children: ReactNode;
}

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>();

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
    if (!loading) {
      setLoadingMessage(undefined);
    }
  };

  return (
    <LoaderContext.Provider
      value={{ isLoading, setLoading, loadingMessage, setLoadingMessage }}
    >
      {children}
    </LoaderContext.Provider>
  );
};
