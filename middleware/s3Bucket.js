const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketname = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});
// upload a file to s3

function uploadFile(files) {
  files.map((x) => {
    const uploadParams = {
      Bucket: bucketname,
      Body: fs.createReadStream(x.path),
      Key: x.filename,
      ACL: "public-read",
    };
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        res.json({ error: true, Message: err });
      } else {
        ResponseData.push(data);
        if (ResponseData.length == file.length) {
          res.json({
            error: false,
            Message: "File Uploaded    SuceesFully",
            Data: ResponseData,
          });
        }
      }
    });
  });
}

exports.uploadFile = uploadFile;

// download a file from s3
