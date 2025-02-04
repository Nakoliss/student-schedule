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
    console.log(`${side} page content:`, content);
  }, [content, side]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(`${side} page onChange:`, e.target.value);
    onChange(e.target.value);
  };

  return (
    <Textarea
      value={content}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      className={className}
      placeholder={placeholder}
      rows={20}
    />
  );
};