const AWS = require('aws-sdk');
const { config } = require('../config/config');

const s3 = new AWS.S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region
});

class S3Service {
  async uploadFile(file, key) {
    const params = {
      Bucket: config.aws.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    try {
      const result = await s3.upload(params).promise();
      return result.Location;
    } catch (error) {
      throw new Error(`Error uploading file to S3: ${error.message}`);
    }
  }

  async deleteFile(key) {
    const params = {
      Bucket: config.aws.bucketName,
      Key: key
    };

    try {
      await s3.deleteObject(params).promise();
    } catch (error) {
      console.error(`Error deleting file from S3: ${error.message}`);
    }
  }
}

module.exports = new S3Service(); 