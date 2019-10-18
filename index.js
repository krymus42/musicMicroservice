const express = require("express");
const app = express();
const port = process.env.port || 3000;
const path = require('path');
const Media = require("./Schemes/mediaSchema.js");
const multer= require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: (req,file,cb)=> cb(null,__dirname+"/uploads"),
  filename: (req,file,cb)=> {
    const name = file.originalname.split(" ").join("-"); //removing spaces
    cb(null,name);},
})
const upload = multer({
  storage:storage,
  fileFilter: (req,file,cb)=>{
    if(file.mimetype.toLowerCase().includes("audio") || file.mimetype.toLowerCase().includes("video"))
      return cb(null,true);
    else
       cb(null, false, new Error(' Wrong mimetype'));
  },
});
app.get("/",(req,res)=>res.sendFile(path.join(__dirname+'/html/index.html')));


app.get("/addSong",(req,res)=>{  // this will return html with file upload form
res.sendFile(path.join(__dirname+"/html/addSong.html"));
});

app.post("/addSong",upload.array('files'),(req,res)=>{ /* I'm calling it song
but it accepts video as well, so user don't have to convert music video to
audio file */
console.log("Adding song");
res.redirect("/");
});

app.get("/listSongs",(req,res)=>{ // this will respond with list of files, which will be turned by frontend to html list with links
  let list = Array();
 fs.readdirSync(path.join(__dirname+"/uploads")).forEach((file)=>{
   list.push(file);
 });
 res.send(list);
});

app.get("/:media",(req,res)=>{  // frontend will send request here to get songs path in order to set <video> source
let filePath;
fs.readdirSync(path.join(__dirname+"/uploads")).forEach((file)=>{
  if(file === req.params.media)
   filePath = file;
});
if(filePath)
res.sendFile(path.join(__dirname+"/uploads/"+filePath));
else
res.send("Wrong file");
});



app.listen(port,console.log(`listening on port ${port}`));
