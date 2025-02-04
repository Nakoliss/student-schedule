import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

interface NotebookPageProps {
  content: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  side: 'left' | 'right';
  className: string;
  placeholder: string;
}

export const NotebookPage = ({
  content,
  onChange,
  onKeyDown,
  side,
  className,
  placeholder
}: NotebookPageProps) => {
  useEffect(() => {
    console.log(`${side} page content length:`, content?.length || 0);
  }, [content, side]);

  return (
    <Textarea
      value={content || ""}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className={className}
      placeholder={placeholder}
      rows={20}
    />
  );
};