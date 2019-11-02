const { RESPONSE_STATUS, Response, Controller } = require('../base');
const formidable = require("formidable");
let fs = require("fs");
const db = require('./../../modelsORM');

const AWS = require('aws-sdk');
const ID = 'AKIAJV4EWT5ZJKHMSJNQ';
const SECRET = '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';

const BUCKET_NAME = 'pre-school1772';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

class UploadController  {

    uploadFile = (fileName, nameFile) => {
        // Read content from the file
        const fileContent = fs.readFileSync(fileName);
    
        // Setting up S3 upload parameters
        const params = {
            Bucket: BUCKET_NAME,
            Key: nameFile, // File name you want to save as in S3
            Body: fileContent
        };
    
        // Uploading files to the bucket
        return new Promise((resolve, reject) => {
            s3.upload(params, function(err, data) {
                if (err) {
                    reject(err)
                    throw err;
                }
                console.log(`File uploaded successfully. ${data.Location}`);
                resolve(data)
            });
        })
    };

    async uploadImage(req, res) {
        console.log("req", req.file);
        // Khởi tạo biến form bằng IncomingForm để phân tích một tập tin tải lên
      let form = new formidable.IncomingForm();
      // Cấu hình thư mục sẽ chứa file trên server với hàm .uploadDir
      form.uploadDir = "uploads/"
      // Xử lý upload file với hàm .parse
      form.parse(req, (err, fields, files) => {
        if (err) throw err;
        console.log("files", files);
        // Lấy ra đường dẫn tạm của tệp tin trên server
        let tmpPath = files.upfile.path;
        // Khởi tạo đường dẫn mới, mục đích để lưu file vào thư mục uploads của chúng ta
        let newPath = form.uploadDir + files.upfile.name;
        fs.rename(tmpPath, newPath, (err) => {
            if (err){
                res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' })); 
                throw err
            };
            
            try {
                fs.readFile(newPath, async (err, fileUploaded) => {
                    console.log("new path",newPath, "err", err, "fileUploaded", err, fileUploaded)
                    const result = await this.uploadFile(newPath, files.upfile.name);
                    console.log("res", result);
                    //delete file after upload
                    fs.unlink(newPath, function (err) {
                        if (err) throw err;
                        // if nos error, file has been deleted successfully
                        console.log('File deleted!');
                    });
                    const data = {
                        path: result.Location
                    }
                    const image = await db['image'].create(data);
                    console.log("image", image);
                    result.id = image.id;
                  res.json(new Response(RESPONSE_STATUS.SUCCESS, result))
                });
            } catch (error) {
                res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
            }
        });
      })
    }
   
}
module.exports = UploadController;