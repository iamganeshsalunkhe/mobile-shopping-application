const { PutObjectCommand} = require("@aws-sdk/client-s3")
const {s3Client} = require('./s3Credentials.js');
const dotenv = require('dotenv');
dotenv.config();

exports.putObject = async(file,fileName)=>{
    try {
        const params = {
            Bucket:process.env.AWS_BUCKET_NAME,
            Key:fileName,
            Body:file.buffer,
            ContentType:file.mimetype
        }

        const command = new PutObjectCommand(params);
        const data = await s3Client.send(command);

        if (data.$metadata.httpStatusCode !== 200){
            return;
        };

        let url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`

        console.log(url);

        return url;
    } catch (error) {
        console.log(error);
    }
}