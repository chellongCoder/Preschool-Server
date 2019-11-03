const formidable = require("formidable");
let fs = require("fs");
const db = require('./../../modelsORM');

const AWS = require('aws-sdk');
const ID = 'AKIAVLIUNI72AWIT67B4';
const SECRET = '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';

const BUCKET_NAME = 'pre-school1772';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

class UploadModel  {

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
      return new Promise((resolve, reject) => {
        let form = new formidable.IncomingForm();
        // Cấu hình thư mục sẽ chứa file trên server với hàm .uploadDir
        form.uploadDir = "uploads/";
        // Xử lý upload file với hàm .parse
        form.parse(req, (err, fields, files) => {
          if (err) throw err;
          console.log("files", files);
          let arr = [];
          for (const file of Object.keys(files)) {
              
              console.log("file", file, files[file]);
              let element = files[file];
              arr.push(element);
              // Lấy ra đường dẫn tạm của tệp tin trên server
              
          }
          let results = [];
          let requests = arr.reduce((promiseChain, item) => {
              return promiseChain.then(() => new Promise((resolve) => {
                this.asyncFunction(item, resolve, form, results);
              }));
          }, Promise.resolve());
          requests.then((results) => {
              resolve(results);
          })
          requests.catch((error) => {
            reject(error);
          })
        })
      })
    }

    asyncFunction = (element, cb, form, results) => {
        let tmpPath = element.path;
            // Khởi tạo đường dẫn mới, mục đích để lưu file vào thư mục uploads của chúng ta
            let newPath = form.uploadDir + element.name;
            fs.rename(tmpPath, newPath, (err) => {
                if (err){
                    throw err
                };
                
                try {
                    fs.readFile(newPath, async (err, fileUploaded) => {
                        console.log("new path",newPath, "err", err, "fileUploaded", err, fileUploaded)
                        const result = await this.uploadFile(newPath, element.name);
                        console.log("res", result);
                        //delete file after upload
                        fs.unlink(newPath, function (err) {
                            if (err) throw err;
                            // if nos error, file has been deleted successfully
                            console.log('File deleted!');
                        });
                        const data = {
                            path: result.Location
                        }
                        const image = await db['image'].create(data);
                        console.log("image", image);
                        result.id = image.id;
                        results.push(result);
                        cb(results);
                    });
                } catch (error) {
                    throw err
                }
            });

    }
}

module.exports = UploadModel