const { Document } = require('../models/document.model');
const axios = require('axios');
const { config } = require('../../config/config');
const s3Service = require('../../services/s3.service');
const path = require('path');

class DocumentService {
  async createDocument(title, file) {
    try {
      // Generate S3 key
      const key = `documents/${Date.now()}-${file.originalname}`;

      // Upload to S3
      const s3Url = await s3Service.uploadFile(file, key);

      // Create document in database
      const document = await Document.create({
        title,
        fileName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: s3Url,
        s3Key: key
      });

      // Send to Python RAG service for processing
      try {
        await this.startDocumentProcessing(document);
      } catch (error) {
        console.error('Error initiating document processing:', error);
        // Don't throw - we still want to return the document
      }

      return document;
    } catch (error) {
      throw new Error(`Failed to create document: ${error.message}`);
    }
  }

  async startDocumentProcessing(document) {
    // Notify Python service to start processing
    await axios.post(`${config.pythonService.url}/process`, {
      documentId: document.id,
      s3Key: document.s3Key,
      s3Url: document.path,
      mimeType: document.mimeType
    });
  }

  async deleteDocument(id) {
    const document = await Document.findByPk(id);
    if (!document) {
      throw new Error('Document not found');
    }

    // Delete from S3
    if (document.s3Key) {
      await s3Service.deleteFile(document.s3Key);
    }

    // Delete from database
    await document.destroy();
  }

  async processDocument(document) {
    // Add your document processing logic here
    // For example, extract text from PDF, create embeddings, etc.
  }

  async getAllDocuments() {
    return Document.findAll({
      order: [['createdAt', 'DESC']]
    });
  }

  async getDocumentById(id) {
    return Document.findByPk(id);
  }
}

module.exports = new DocumentService(); 