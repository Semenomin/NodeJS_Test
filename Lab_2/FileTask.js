let path = require('path');
let fs = require('fs');
let files=[];

function IsFile(fileName){
   return fs.statSync(fileName).isFile();
}

function sortByBirthTime(files)
{
    let map = new Map();
    for(let file in files){
        map.set(fs.statSync(file).birthtime,file);
    }
    for(let file in map.keys()){
        console.log(file);
    }
}

function getFiles (fileExtension ,dirPath ,maxFile ,maxDir){
try{
    let read = fs.readdirSync(dirPath);
    for(let paths of read){
        if(IsFile(path.join(dirPath,paths))){
            if(paths.indexOf(fileExtension)>=0){
                files.push(path.resolve(paths));
            }
            else{
                //console.log(`No Files *${fileExtension} in directory ${path.join(dirPath,paths)}`)
            }
        }
        else{
            getFiles(fileExtension,path.join(dirPath,paths),1,1);
        }
    }
}
catch(err)
{
    console.log(err);
}
}
getFiles(".js","D:/Git/",1,1);
