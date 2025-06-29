import { cn } from "@/lib/utils";
import { ChangeEvent, TextareaHTMLAttributes } from "react";

interface NotebookPageProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  content: string;
  side: "left" | "right";
  onChange: (value: string) => void;
}

export const NotebookPage = ({ 
  content, 
  side,
  className,
  onChange,
  ...props 
}: NotebookPageProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      value={content}
      onChange={handleChange}
      className={cn(
        "w-full p-4 bg-transparent border-none focus:outline-none resize-none",
        "font-mono text-base leading-relaxed",
        side === "left" ? "mr-2" : "ml-2",
        className
      )}
      {...props}
    />
  );
};