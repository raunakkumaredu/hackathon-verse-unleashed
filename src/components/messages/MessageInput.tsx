
import React, { memo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const MessageInput = memo(({ value, onChange, onSend }: MessageInputProps) => {
  return (
    <div className="p-4 border-t mt-auto flex gap-2">
      <Input
        placeholder="Type your message..."
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        className="flex-1"
      />
      <Button
        onClick={onSend}
        disabled={!value.trim()}
        size="icon"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
});

MessageInput.displayName = "MessageInput";

export default MessageInput;
