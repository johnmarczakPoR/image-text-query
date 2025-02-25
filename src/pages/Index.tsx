
import { AnalysisForm } from "@/components/AnalysisForm";
import { useStore } from "@/store/useStore";

const Index = () => {
  const { result } = useStore();

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Image Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Upload an image and ask questions to analyze it
          </p>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6 sm:p-8">
          <AnalysisForm />
          
          {result && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Result</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
