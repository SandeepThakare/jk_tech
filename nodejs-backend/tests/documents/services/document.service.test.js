const { Document } = require('../../../src/documents/models/document.model');
const DocumentService = require('../../../src/documents/services/document.service');
const s3Service = require('../../../src/services/s3.service');

// Mock S3 service
jest.mock('../../../src/services/s3.service');

describe('DocumentService', () => {
  let documentService;

  beforeEach(() => {
    documentService = new DocumentService();
    // Reset all mocks
    jest.clearAllMocks();
  });

  describe('createDocument', () => {
    it('should create document successfully', async () => {
      const mockFile = {
        originalname: 'test.pdf',
        mimetype: 'application/pdf',
        size: 1024,
        buffer: Buffer.from('test')
      };

      const mockS3Url = 'https://s3-bucket.com/test.pdf';
      s3Service.uploadFile.mockResolvedValue(mockS3Url);

      const result = await documentService.createDocument('Test Doc', mockFile);

      expect(result).toBeDefined();
      expect(result.title).toBe('Test Doc');
      expect(result.fileName).toBe(mockFile.originalname);
      expect(result.path).toBe(mockS3Url);
      expect(s3Service.uploadFile).toHaveBeenCalled();
    });

    it('should handle upload failure', async () => {
      const mockFile = {
        originalname: 'test.pdf',
        mimetype: 'application/pdf',
        size: 1024,
        buffer: Buffer.from('test')
      };

      s3Service.uploadFile.mockRejectedValue(new Error('Upload failed'));

      await expect(
        documentService.createDocument('Test Doc', mockFile)
      ).rejects.toThrow('Failed to create document');
    });
  });

  describe('deleteDocument', () => {
    it('should delete document successfully', async () => {
      const mockDocument = await Document.create({
        title: 'Test Doc',
        fileName: 'test.pdf',
        path: 'https://s3-bucket.com/test.pdf',
        s3Key: 'documents/test.pdf'
      });

      await documentService.deleteDocument(mockDocument.id);

      expect(s3Service.deleteFile).toHaveBeenCalledWith(mockDocument.s3Key);
      const deletedDoc = await Document.findById(mockDocument.id);
      expect(deletedDoc).toBeNull();
    });

    it('should handle document not found', async () => {
      await expect(
        documentService.deleteDocument('nonexistentid')
      ).rejects.toThrow('Document not found');
    });
  });

  describe('getAllDocuments', () => {
    it('should return all documents', async () => {
      await Document.create([
        {
          title: 'Doc 1',
          fileName: 'doc1.pdf',
          path: 'https://s3-bucket.com/doc1.pdf'
        },
        {
          title: 'Doc 2',
          fileName: 'doc2.pdf',
          path: 'https://s3-bucket.com/doc2.pdf'
        }
      ]);

      const documents = await documentService.getAllDocuments();

      expect(documents).toHaveLength(2);
      expect(documents[0]).toHaveProperty('title', 'Doc 1');
      expect(documents[1]).toHaveProperty('title', 'Doc 2');
    });
  });
}); 