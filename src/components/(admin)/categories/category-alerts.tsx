"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";

interface CategoryAlertProps {
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

export function CategoryAlert({ type, title, message }: CategoryAlertProps) {
  const icon = type === "success" ? <CheckCircle className="h-5 w-5 text-green-500" /> : type === "error" ? <AlertTriangle className="h-5 w-5 text-red-500" /> : <Info className="h-5 w-5 text-blue-500" />;

  return (
    <Alert className={`${type === "success" ? "border-green-400/50 bg-green-50" : type === "error" ? "border-red-400/50 bg-red-50" : "border-blue-400/50 bg-blue-50"}`}>
      <div className="flex gap-2 items-center">
        {icon}
        <div>
          <AlertTitle className="font-semibold">{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
