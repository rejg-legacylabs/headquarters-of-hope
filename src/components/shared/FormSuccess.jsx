import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function FormSuccess({ title, message, referenceId }) {
  return (
    <div className="text-center py-12 lg:py-16 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-accent" />
      </div>
      <h3 className="font-heading text-2xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">{message}</p>
      {referenceId && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Your Reference ID</p>
          <p className="font-display text-lg font-bold text-primary">{referenceId}</p>
          <p className="text-xs text-muted-foreground mt-1">Please save this for your records</p>
        </div>
      )}
      <Link to="/">
        <Button variant="outline">Return to Home</Button>
      </Link>
    </div>
  );
}