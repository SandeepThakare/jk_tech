const axios = require('axios');
const { IngestionJob, IngestionStatus } = require('../models/ingestion.model');
const { config } = require('../../config/config');

class IngestionService {
  async startIngestion(document) {
    const job = await IngestionJob.create({
      documentId: document.id,
      status: IngestionStatus.PENDING
    });

    // Trigger Python backend ingestion
    this.processIngestion(job).catch(console.error);

    return job;
  }

  async processIngestion(job) {
    try {
      job.status = IngestionStatus.PROCESSING;
      await job.save();

      // Call Python backend
      await axios.post(`${config.pythonService.url}/documents/`, {
        title: job.document.title,
        file: job.document.fileName
      });

      job.status = IngestionStatus.COMPLETED;
    } catch (error) {
      job.status = IngestionStatus.FAILED;
      job.error = error.message;
    }

    await job.save();
  }

  async getJobStatus(jobId) {
    const job = await IngestionJob.findOne({
      where: { id: jobId },
      include: ['document']
    });

    if (!job) {
      throw new Error("Ingestion job not found");
    }

    return job;
  }
}

module.exports = new IngestionService(); 