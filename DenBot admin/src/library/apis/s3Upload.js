
import AWS from 'aws-sdk'

const S3_BUCKET = 'denbot';
const REGION = 'eu-west-2';


AWS.config.update({
    accessKeyId: 'AKIA3HPQNUJYA5BFIGG2',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

export async function uploadFile(file) {
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}-${current.getHours()}${current.getMinutes()}${current.getSeconds()}`
    var keyPrefix = `${date}-`

    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: keyPrefix + file.name
    };

    try {
        const data = await myBucket.upload(params).promise();
        console.log(`File uploaded successfully. File URL: ${data.Location}`);
        return data.Location;
    } catch (err) {
        console.log('Error uploading file:', err);
        throw err;
    }
}
