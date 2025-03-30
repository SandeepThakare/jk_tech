import React from "react";

export const DocumentList = ({ documents, onSelectDocument }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Documents</h2>
      {documents.length === 0 ? (
        <p className="text-gray-500">No documents uploaded yet</p>
      ) : (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="p-3 hover:bg-gray-50 rounded cursor-pointer"
              onClick={() => onSelectDocument(doc)}
            >
              <h3 className="font-medium">{doc.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(doc.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 