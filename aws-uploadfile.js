const fs = require('fs');
const AWS = require('aws-sdk');
const ID = 'AKIAJV4EWT5ZJKHMSJNQ';
const SECRET = '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';

const BUCKET_NAME = 'pre-school1772';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'readme.md', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

uploadFile('Readme.md');