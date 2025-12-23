import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorAlertProps {
  message: string;
  onDismiss: () => void;
}

const ErrorAlert = ({ message, onDismiss }: ErrorAlertProps) => {
  return (
    <Alert className="bg-destructive/10 border-destructive animate-fade-in">
      <AlertCircle className="h-4 w-4 text-destructive" />
      <AlertTitle className="text-destructive font-semibold">Selection Error</AlertTitle>
      <AlertDescription className="text-destructive/90">
        {message}
      </AlertDescription>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-6 w-6 p-0 text-destructive hover:text-destructive/80 hover:bg-destructive/20"
        onClick={onDismiss}
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  );
};

export default ErrorAlert;
