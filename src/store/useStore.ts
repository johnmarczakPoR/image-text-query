
import { create } from 'zustand';

interface ImageAnalysisState {
  image: string | null;
  text: string;
  result: string | null;
  isLoading: boolean;
  error: string | null;
  setImage: (image: string | null) => void;
  setText: (text: string) => void;
  setResult: (result: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useStore = create<ImageAnalysisState>((set) => ({
  image: null,
  text: '',
  result: null,
  isLoading: false,
  error: null,
  setImage: (image) => set({ image }),
  setText: (text) => set({ text }),
  setResult: (result) => set({ result }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set({ image: null, text: '', result: null, error: null }),
}));
