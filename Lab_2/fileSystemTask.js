let path = require('path');
let fs = require('fs');
let readline = require('readline');
let files=[];
let sortedFiles=[];

var rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

function IsFile(fileName){
   return fs.statSync(fileName).isFile();
}

function sortByBirthTime(files,maxFile){
    let listOfBirthtimes = [];
    for(let file of files){
        listOfBirthtimes.unshift(fs.statSync(file).birthtimeMs);
    }
    listOfBirthtimes.sort();
    listOfBirthtimes.reverse();
    let maxBirthFile = listOfBirthtimes[0];
    for(let birth of listOfBirthtimes){
        if (maxBirthFile-birth > 10000){
            listOfBirthtimes.indexOf(birth);
            for(let i=0;i<(listOfBirthtimes.length-listOfBirthtimes.indexOf(birth)-1);i++){
                listOfBirthtimes.pop();
            }
        }
    }
    for(let file of files){
        for(let birth of listOfBirthtimes){
            if(birth == fs.statSync(file).birthtimeMs)
            {
                sortedFiles.unshift(file);
                break;
            }
        }
    }
    if(sortedFiles.length > maxFile){
        for(let i = 0;i<sortedFiles.length-maxFile+1;i++){
            sortedFiles.pop();
        }
    }
}

function getFiles (fileExtension ,dirPath,maxDir){
try{
    let read = fs.readdirSync(dirPath);
    for(let paths of read){
        if(IsFile(path.join(dirPath,paths))){
            if(path.extname(paths)==fileExtension){
                files.push(path.join(dirPath,paths));
            }
            else{
                //console.log(`No Files *${fileExtension} in directory ${path.join(dirPath,paths)}`)
            }
        }
        else{
            if(maxDir!=0){
                getFiles(fileExtension,path.join(dirPath,paths),maxDir-1);
            }
        }
    }
}
catch(err){
    console.log(err);
}
}
function mainFunc(fileExtension ,dirPath ,maxFile = Infinity ,maxDir = Infinity){
    getFiles(fileExtension ,dirPath ,maxDir);
    sortByBirthTime(files,maxFile);
    console.log(sortedFiles);
}
rl.question("Введите данные в порядке (fileExtension,dirPath,maxFile,maxDir) через запятую, если хотите взять функцию из программы введите 0\n", function(answer) {
  if (answer == "0"){
    mainFunc(".js","C:/Users/Alina/Documents/GitHub");
  }
  else{
    let array = answer.split(',');
    mainFunc(array[0],array[1],array[2],array[3]);
  };
  rl.close();
  });
