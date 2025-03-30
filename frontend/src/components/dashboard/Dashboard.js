import React, { useState, useEffect } from "react";
import { DocumentUpload } from "./DocumentUpload";
import { DocumentList } from "./DocumentList";
import { ChatPanel } from "./ChatPanel";

export const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleUploadSuccess = (newDocument) => {
    setDocuments([newDocument, ...documents]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <DocumentUpload onUploadSuccess={handleUploadSuccess} />
          <DocumentList
            documents={documents}
            onSelectDocument={setSelectedDocument}
          />
        </div>
        <div className="md:col-span-2">
          {selectedDocument && <ChatPanel document={selectedDocument} />}
        </div>
      </div>
    </div>
  );
}; 