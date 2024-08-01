// services/awsS3Service.js

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

class AwsS3Service {
  constructor() {
    this.s3Client = new AWS.S3();
  }

  async uploadFile(filename, filePath, bucketName) {
    try {
      const fileContent = fs.readFileSync(filePath);
      const params = {
        Bucket: bucketName,
        Key: filename,
        Body: fileContent
      };

      const data = await this.s3Client.upload(params).promise();
      console.log(`File uploaded successfully. ${data.Location}`);
      return data;
    } catch (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
  }

  getUrl(bucketName, key) {
    const params = { Bucket: bucketName, Key: key };
    return this.s3Client.getSignedUrl('getObject', params);
  }

  async downloadFile(bucket, fileName) {
    try {
      const params = { Bucket: bucket, Key: fileName };
      const data = await this.s3Client.getObject(params).promise();
      return data.Body.toString('utf-8');
    } catch (error) {
      throw new Error(`Error downloading file: ${error.message}`);
    }
  }

  async bulkUploadFiles(sourceDirectory, files, bucket, s3TargetDirectoryPath) {
    const uploadPromises = files.map(file => {
      const filePath = path.join(sourceDirectory, file);
      const fileContent = fs.readFileSync(filePath);
      const params = {
        Bucket: bucket,
        Key: path.join(s3TargetDirectoryPath, path.basename(file)),
        Body: fileContent
      };

      return this.s3Client.upload(params).promise();
    });

    try {
      const results = await Promise.all(uploadPromises);
      return results.map(result => result.Location);
    } catch (error) {
      throw new Error(`Error uploading files: ${error.message}`);
    }
  }
}

module.exports = new AwsS3Service();
