
import React, { useState } from "react";
import Modal from "./Modal";

const positiveWords = [
  "Great job!", "Awesome!", "Keep going!", "Impressive!", "Well done!", "Fantastic!", 
  "Inspirational!", "Exceptional!", "Terrific!", "Amazing work!", "Superb effort!"
];

interface MessageModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

const MessageModal: React.FC<MessageModalProps> = ({ open, onClose, title = "Send a Message" }) => {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sentMsg, setSentMsg] = useState("");

  function sendIt() {
    const random = positiveWords[Math.floor(Math.random() * positiveWords.length)];
    setSentMsg(random);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setSentMsg("");
      setMessage("");
      onClose();
    }, 1200);
  }

  return (
    <Modal open={open} onClose={onClose} title={title}>
      {!sent ? (
        <div>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 p-2 mb-3 dark:bg-gray-800 dark:text-white"
            rows={4}
            placeholder="Type your message..."
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition-colors"
            onClick={sendIt}
            disabled={!message.trim()}
          >
            Send
          </button>
        </div>
      ) : (
        <div className="text-center text-green-600 dark:text-green-400 text-lg font-bold py-8">{sentMsg}</div>
      )}
    </Modal>
  );
};

export default MessageModal;
