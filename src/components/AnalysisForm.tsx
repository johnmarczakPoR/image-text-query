
import { FormEvent } from 'react';
import { useStore } from '../store/useStore';
import { ImageUpload } from './ImageUpload';
import { toast } from '@/components/ui/use-toast';

export const AnalysisForm = () => {
  const { text, setText, image, isLoading, setIsLoading, setResult, setError } = useStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!image || !text.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both an image and text for analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image,
          text,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResult(data.result);
      toast({
        title: "Analysis Complete",
        description: "Your image and text have been analyzed successfully.",
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      toast({
        title: "Error",
        description: "Failed to analyze the image and text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-2xl mx-auto">
      <div className="space-y-2">
        <ImageUpload />
      </div>
      
      <div className="space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your question about the image..."
          className="w-full min-h-[100px] p-4 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !image || !text.trim()}
        className="w-full py-3 px-6 rounded-lg bg-primary text-white font-medium transition-all duration-200 
                 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Analyzing...
          </span>
        ) : (
          'Analyze Image'
        )}
      </button>
    </form>
  );
};
