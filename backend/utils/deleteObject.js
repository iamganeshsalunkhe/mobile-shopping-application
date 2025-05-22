const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./s3Credentials");


exports.deleteObject  = async (s3Key) =>{
    console.log(s3Key);
    try {
        const params = {
            Bucket:process.env.AWS_BUCKET_NAME,
            Key:s3Key
        }
        const command = new DeleteObjectCommand(params);
        await s3Client.send(command)
    } catch (error) {
        console.error(error);
    }
}