const AWS = require('aws-sdk');
const config = require('./config'); // Assume you have a config.js with AWS credentials and region

const s3 = new AWS.S3({
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretKey,
    region: config.aws.region
});

module.exports = s3;
