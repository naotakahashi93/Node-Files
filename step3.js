const fs = require('fs');
const process = require('process');
const axios = require('axios');


function output(content, pathout){
    if(out){
        fs.writeFile(pathout, content, 'utf8', function(err) {
            if (err) {
              console.error(`Couldn't write ${pathout}: ${err}`);
              process.exit(1);
            }
          });
        } else {
          console.log(text);
        
    }
}

function cat(path, out){
    fs.readFile(path, "utf8", function(err, data){
        if(err){
            console.log(`Error reading ${path}`, err)
            process.exit(1);
        }
        else {
            output(data, out)}
    })

}
// cat(process.argv[2])

async function webCat(url, out){
    try{
        let resp = await axios.get(url);
        output(resp.data, out);
        console.log("hi", resp.data)
    }
    catch (err){
        console.log("Error!", err)
        process.exit(1)
    }
}

let path;
let out;

if (process.argv[2] === "--out"){
    out = process.argv[3];
  path = process.argv[4];
}
else{
    path = process.argv[2]
}

if (path.slice(0,4) === "http"){
 webCat(path, out)
}
else{
    cat(path, out)
}