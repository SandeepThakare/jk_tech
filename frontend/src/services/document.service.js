import api from "./api";

export const documentService = {
  async uploadDocument(formData) {
    const response = await api.post("/documents", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'  // Important for file uploads
      }
    });
    return response.data;
  },

  async getDocuments() {
    const response = await api.get("/documents");
    return response.data;
  },

  async getDocument(id) {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  },

  async askQuestion(documentId, question) {
    const response = await api.post(`/documents/${documentId}/ask`, { question });
    return response.data;
  }
}; 