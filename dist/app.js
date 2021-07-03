"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formidable_1 = __importDefault(require("formidable"));
const fs_1 = __importDefault(require("fs"));
const app = express_1.default();
const port = 2345;
var corsOptions = {
    origin: ["http://localhost:3000", "https://whatshistory.vercel.app", "https://whatshistory.netlify.app", "*"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//app.use(cors());
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
app.use(express_1.default.static('public'));
app.get("/uploadFile", (req, res) => {
    console.log("Si");
    res.json({ get: "You are in get" });
});
app.post("/uploadFile", (req, res) => {
    console.log("Somone");
    let origin = req.headers.origin;
    console.log(origin);
    let uploadDir = "./public";
    var form = formidable_1.default({ multiples: true, uploadDir: uploadDir, keepExtensions: true });
    form.parse(req, (err, fields, files) => {
        let upfiles = [];
        let names = Object.entries(files);
        for (let a of names) {
            let file = a[1];
            let n = a[0];
            let newname = uploadDir + "/" + file.name;
            fs_1.default.rename(file.path, newname, (e) => { console.error(e); });
            //name= name.replace("\\","/");
            newname = newname.replace("./", "");
            newname = newname.replace("public", "");
            upfiles.push(newname);
        }
        console.log({ result: upfiles });
        res.status(200).json({ result: upfiles });
        //  console.log("Files",files);
    });
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map