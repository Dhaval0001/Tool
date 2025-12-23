import { useState } from "react";
import { SelectionFormData } from "@/types/selection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2, Zap, Wind, Gauge } from "lucide-react";

interface SelectionFormProps {
  onSubmit: (data: SelectionFormData) => void;
  isLoading: boolean;
}

const SelectionForm = ({ onSubmit, isLoading }: SelectionFormProps) => {
  const [formData, setFormData] = useState<SelectionFormData>({
    airUnit: "",
    airflowValue: 0,
    staticPressureUnit: "",
    staticPressureValue: 0,
    modelType: "",
    motorType: "",
    sreInput: 0,
    moistureTransferInput: 0,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SelectionFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SelectionFormData, string>> = {};

    if (!formData.airUnit) newErrors.airUnit = "Required";
    if (!formData.airflowValue || formData.airflowValue <= 0) newErrors.airflowValue = "Enter valid airflow";
    if (!formData.staticPressureUnit) newErrors.staticPressureUnit = "Required";
    if (!formData.staticPressureValue || formData.staticPressureValue < 0) newErrors.staticPressureValue = "Enter valid pressure";
    if (!formData.modelType) newErrors.modelType = "Required";
    if (!formData.motorType) newErrors.motorType = "Required";
    if (formData.modelType === "HRV" && formData.moistureTransferInput > 1) {
      newErrors.moistureTransferInput = "Cannot exceed 1 for HRV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateField = <K extends keyof SelectionFormData>(
    field: K,
    value: SelectionFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="card-elevated animate-fade-in">
      <CardHeader className="border-b border-border/50 bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Settings2 className="w-5 h-5 text-secondary" />
          Selection Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Airflow Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="airUnit" className="label-text flex items-center gap-2">
                <Wind className="w-4 h-4 text-secondary" />
                Air Unit
              </Label>
              <Select
                value={formData.airUnit}
                onValueChange={(value) => updateField("airUnit", value)}
              >
                <SelectTrigger 
                  id="airUnit" 
                  className={`input-field ${errors.airUnit ? "border-destructive" : ""}`}
                >
                  <SelectValue placeholder="Select unit..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="Cubic Feet Per Minute (CFM)">Cubic Feet Per Minute (CFM)</SelectItem>
                  <SelectItem value="Litre Per Second (L/S)">Litre Per Second (L/S)</SelectItem>
                </SelectContent>
              </Select>
              {errors.airUnit && <p className="error-text text-xs">{errors.airUnit}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="airflowValue" className="label-text">
                Airflow Value
              </Label>
              <Input
                id="airflowValue"
                type="number"
                placeholder="Enter value..."
                className={`input-field ${errors.airflowValue ? "border-destructive" : ""}`}
                value={formData.airflowValue || ""}
                onChange={(e) => updateField("airflowValue", parseFloat(e.target.value) || 0)}
              />
              {errors.airflowValue && <p className="error-text text-xs">{errors.airflowValue}</p>}
            </div>
          </div>

          {/* Static Pressure Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="staticPressureUnit" className="label-text flex items-center gap-2">
                <Gauge className="w-4 h-4 text-secondary" />
                Static Pressure Unit
              </Label>
              <Select
                value={formData.staticPressureUnit}
                onValueChange={(value) => updateField("staticPressureUnit", value)}
              >
                <SelectTrigger 
                  id="staticPressureUnit" 
                  className={`input-field ${errors.staticPressureUnit ? "border-destructive" : ""}`}
                >
                  <SelectValue placeholder="Select unit..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="Pascals (Pa)">Pascals (Pa)</SelectItem>
                  <SelectItem value="Inch Water Guage (IN W.G.)">Inch Water Guage (IN W.G.)</SelectItem>
                </SelectContent>
              </Select>
              {errors.staticPressureUnit && <p className="error-text text-xs">{errors.staticPressureUnit}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="staticPressureValue" className="label-text">
                Static Pressure Value
              </Label>
              <Input
                id="staticPressureValue"
                type="number"
                step="0.01"
                placeholder="Enter value..."
                className={`input-field ${errors.staticPressureValue ? "border-destructive" : ""}`}
                value={formData.staticPressureValue || ""}
                onChange={(e) => updateField("staticPressureValue", parseFloat(e.target.value) || 0)}
              />
              {errors.staticPressureValue && <p className="error-text text-xs">{errors.staticPressureValue}</p>}
            </div>
          </div>

          {/* Model & Motor Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modelType" className="label-text flex items-center gap-2">
                <Zap className="w-4 h-4 text-secondary" />
                Model Type
              </Label>
              <Select
                value={formData.modelType}
                onValueChange={(value) => updateField("modelType", value)}
              >
                <SelectTrigger 
                  id="modelType" 
                  className={`input-field ${errors.modelType ? "border-destructive" : ""}`}
                >
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="HRV">HRV</SelectItem>
                  <SelectItem value="ERV">ERV</SelectItem>
                </SelectContent>
              </Select>
              {errors.modelType && <p className="error-text text-xs">{errors.modelType}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="motorType" className="label-text">
                Motor Type
              </Label>
              <Select
                value={formData.motorType}
                onValueChange={(value) => updateField("motorType", value)}
              >
                <SelectTrigger 
                  id="motorType" 
                  className={`input-field ${errors.motorType ? "border-destructive" : ""}`}
                >
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="PSC">PSC</SelectItem>
                  <SelectItem value="ECM">ECM</SelectItem>
                </SelectContent>
              </Select>
              {errors.motorType && <p className="error-text text-xs">{errors.motorType}</p>}
            </div>
          </div>

          {/* SRE & Moisture Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sreInput" className="label-text">
                SRE Input
              </Label>
              <Input
                id="sreInput"
                type="number"
                step="0.1"
                placeholder="Enter SRE value..."
                className="input-field"
                value={formData.sreInput || ""}
                onChange={(e) => updateField("sreInput", parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="moistureTransferInput" className="label-text">
                Moisture Transfer Input
              </Label>
              <Input
                id="moistureTransferInput"
                type="number"
                step="0.01"
                placeholder="Enter value..."
                className={`input-field ${errors.moistureTransferInput ? "border-destructive" : ""}`}
                value={formData.moistureTransferInput || ""}
                onChange={(e) => updateField("moistureTransferInput", parseFloat(e.target.value) || 0)}
              />
              {errors.moistureTransferInput && <p className="error-text text-xs">{errors.moistureTransferInput}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="btn-primary w-full h-12 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                "Run Selection"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SelectionForm;
