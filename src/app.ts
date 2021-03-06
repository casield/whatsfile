import express from 'express';
import formidable from 'formidable';
import fs from 'fs';
import cors from 'cors';
import path from 'path';


const app = express();
const port = 2345;

var corsOptions = {
  origin: ["http://localhost:3000", "https://whatshistory.vercel.app","https://whatshistory.netlify.app","*"],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//app.use(cors());

app.use(express.static('public'));
app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "public", "index.html"));
 });
app.get("/uploadFile",(req,res)=>{
  console.log("Si")
  res.json({get:"You are in get"})
})
app.post("/uploadFile",(req, res) => {
  console.log("Somone")
  let origin = req.headers.origin;
  console.log(origin)
  let uploadDir = "./public";
  var form = formidable({ multiples: true, uploadDir: uploadDir, keepExtensions: true });

  form.parse(req, (err, fields, files) => {

    let upfiles = [];
    let names = Object.entries(files);


    for (let a of names) {
      let file = (a[1] as formidable.File);
      let n = a[0]


      let newname = uploadDir + "/" + file.name
      fs.rename(file.path, newname, (e) => { console.error(e) });
      //name= name.replace("\\","/");
      newname = newname.replace("./", "")
      newname = newname.replace("public", "")
      upfiles.push(newname)
    }

    console.log({ result: upfiles })


    res.status(200).json({ result: upfiles })
    //  console.log("Files",files);
  })
})
app.listen(port, () => {

  return console.log(`server is listening on ${port}`);
});