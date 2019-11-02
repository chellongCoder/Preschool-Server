const AWS = require('aws-sdk');

const ID = 'AKIAJV4EWT5ZJKHMSJNQ';
const SECRET = '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';

const BUCKET_NAME = 'pre-school1772';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "eu-west-1"
    }
};

s3.createBucket(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket Created Successfully', data.Location);
});
