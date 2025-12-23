import React, { useState } from "react";
import Header from "@/components/Header";
import SelectionForm from "@/components/SelectionForm";
import ResultsTable from "@/components/ResultsTable";
import ErrorAlert from "@/components/ErrorAlert";
import { SelectionFormData, SelectionResult } from "@/types/selection";
import { runSelection } from "@/api/selectionApi";
import { Wind } from "lucide-react";

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SelectionResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastAirUnit, setLastAirUnit] = useState<string>("");

  const handleSubmit = async (formData: SelectionFormData) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await runSelection(formData);
      
      if (response.success && response.results) {
        setResults(response.results);
        setLastAirUnit(formData.airUnit);
      } else {
        setError(response.error || "Failed to retrieve selection results");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-4">
            <Wind className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Professional Selection Tool</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            HRV/ERV Model Selection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your ventilation requirements below to find the optimal Heat Recovery Ventilator 
            or Energy Recovery Ventilator for your application.
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-3xl mx-auto mb-8">
          <SelectionForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8">
            <ErrorAlert message={error} onDismiss={() => setError(null)} />
          </div>
        )}

        {/* Results Section */}
        {results && results.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <ResultsTable results={results} airUnit={lastAirUnit} />
          </div>
        )}

        {/* Empty State */}
        {results && results.length === 0 && (
          <div className="max-w-3xl mx-auto text-center py-12 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Wind className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Models Found</h3>
            <p className="text-muted-foreground">
              No matching models were found for your criteria. Try adjusting your parameters.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-primary mt-auto py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground/70 text-sm">
            © {new Date().getFullYear()} Reversomatic. Industrial Ventilation Solutions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
