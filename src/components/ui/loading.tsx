import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: number;
}

export const Loading = ({ className = "", size = 24 }: LoadingProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 className="animate-spin" size={size} />
    </div>
  );
};

export const PageLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading size={32} />
    </div>
  );
};
