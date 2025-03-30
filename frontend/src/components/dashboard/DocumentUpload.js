import React, { useState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { documentService } from "../../services/document.service";

export const DocumentUpload = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);

      const document = await documentService.uploadDocument(formData);
      onUploadSuccess(document);
      setTitle("");
      setFile(null);
      // Reset file input
      e.target.reset();
    } catch (err) {
      setError("Failed to upload document");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Upload Document</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Document
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
            accept=".pdf,.doc,.docx,.txt"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Supported formats: PDF, DOC, DOCX, TXT
          </p>
        </div>
        <Button type="submit" isLoading={isLoading}>
          Upload
        </Button>
      </form>
    </div>
  );
}; 