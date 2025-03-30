const { Document } = require('../models/document.model');
const axios = require('axios');
const { config } = require('../../config/config');
const s3Service = require('../../services/s3.service');
const path = require('path');

class DocumentService {
  async createDocument(title, file) {
    try {

      const key = `documents/${Date.now()}-${file.originalname}`;

      const s3Url = await s3Service.uploadFile(file, key);

      const document = await Document.create({
        title,
        fileName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: s3Url,
        s3Key: key
      });


      try {
        await this.startDocumentProcessing(document);
      } catch (error) {
        console.error('Error initiating document processing:', error);

      }

      return document;
    } catch (error) {
      throw new Error(`Failed to create document: ${error.message}`);
    }
  }

  async startDocumentProcessing(document) {
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

    if (document.s3Key) {
      await s3Service.deleteFile(document.s3Key);
    }

    await document.destroy();
  }

  async processDocument(document) {
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