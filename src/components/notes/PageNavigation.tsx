import { Button } from "@/components/ui/button";

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (index: number) => void;
}

export const PageNavigation = ({
  currentPage,
  totalPages,
  onPageChange
}: PageNavigationProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          variant={index === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(index)}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};