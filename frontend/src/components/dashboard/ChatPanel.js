import React, { useState } from "react";
import { Button } from "../common/Button";
import { documentService } from "../../services/document.service";

export const ChatPanel = ({ document }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const response = await documentService.askQuestion(document.id, question);
      setMessages([
        ...messages,
        { type: "question", content: question },
        { type: "answer", content: response.answer }
      ]);
      setQuestion("");
    } catch (error) {
      console.error("Failed to get answer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-xl font-bold mb-4">Chat with {document.title}</h2>
      <div className="h-96 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded ${msg.type === "question"
                ? "bg-blue-100 ml-auto"
                : "bg-gray-100 mr-auto"
              }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Ask a question..."
        />
        <Button type="submit" isLoading={isLoading}>
          Send
        </Button>
      </form>
    </div>
  );
}; 