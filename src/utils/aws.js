function backend(){
const express = require('express');
const router = express.Router();
const multer = require('multer');   
// multer need to be installed
const AWS = require('aws-sdk');
 const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
  });

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
      callback(null, '');
    },
  });

  const upload = multer({ storage }).single('image');


//   this part belongs to separte middlewar : 

// const { v4: uuidv4 } = require('uuid');
// const params = (fileName) => {
//     const myFile = fileName.originalname.split('.');
//     const fileType = myFile[myFile.length - 1];
  
//     const imageParams = {
//       // Replace the <My_Bucket_Name> with the name of your own S3 bucket
//       Bucket: '<My_Bucket_Name>',
//       Key: `${uuidv4()}.${fileType}`,
//       Body: fileName.buffer,
//     };
  
//     return imageParams;
//   };
//     module.exports = params

//////////////

router.post('/image-upload', upload, (req, res) => {
    console.log("post('/api/image-upload'", req.file);
    const params = paramsConfig(req.file);
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      res.json(data);
    });
  });
  
  module.exports = router;
}

function frontEnd (){

    // import {useRef} from React
    const fileInput = useRef(null);
    const handleImageUpload = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('image', fileInput.current.files[0]);
      
        const postImage = async () => {
          try {
            const res = await fetch('/api/image-upload', {
              mode: 'cors',
              method: 'POST',
              body: data,
            });
            if (!res.ok) throw new Error(res.statusText);
            const postResponse = await res.json();
            setFormState({ ...formState, image: postResponse.Location });
            console.log('postImage: ', postResponse.Location);
            return postResponse.Location;
          } catch (error) {
            console.log(error);
          }
        };
        postImage();
      };
    // image is the key!
<label className="form-input col-12  p-1">
  Add an image to your thought:
  <input type="file" ref="{fileInput}" className="form-input p-2" />
  <button className="btn" onClick="{handleImageUpload}" type="submit">
    Upload
  </button>
</label>
// lets be honest i didn't know i can just add input file

}



 
