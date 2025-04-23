
import React, { memo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const MessageInput = memo(({ value, onChange, onSend }: MessageInputProps) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSend();
      }
    }
  }, [value, onSend]);

  return (
    <div className="p-4 border-t mt-auto flex gap-2">
      <Input
        placeholder="Type your message..."
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="flex-1"
      />
      <Button
        onClick={onSend}
        disabled={!value.trim()}
        size="icon"
        type="button"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
});

MessageInput.displayName = "MessageInput";

export default MessageInput;
