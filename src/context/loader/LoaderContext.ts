import { createContext } from 'react';

export interface LoaderContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingMessage?: string;
  setLoadingMessage: (message?: string) => void;
}

export const LoaderContext = createContext<LoaderContextType | undefined>(undefined);
