/*
-------------------------------------------------------------------------- Description of the Application----------------------------------------------------------------
 Id - C0838989
 Name - Naveen Reddy
 Subject - Full stack Java Script Assignment-1
 Application: Node_module_zipper

------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------

NPM libraries used for my project is listed below:
1>Loadash
2>Cowsay
3>Numpy
4>Pandas
5>Live-server

*/
/*------------------------------------------------------------------------ Beginning of the code -----------------------------------------------------------------------*/
// required packages to make ZipFolder
var fs = require('fs');
var archiver = require('archiver');

// Printing the argument which taken as a input path
console.log(process.argv[2]);
var directory = process.argv[2];

// variables used store the path for input path and output for zip file

var output = fs.createWriteStream(directory+'\\node_modules.zip');
var archive = archiver('zip');

output.on('close', function () {
    console.log((archive.pointer()/ 1024 / 1024).toFixed(1) + ' MegaBytes, Total size of the zip file');
    console.log(`Closing the application zipper...!`);
});

// if it gets any error it throws error here
archive.on('error', function(err){
    throw err;
});

archive.pipe(output);

var filesInDirectory = fs.readdirSync(directory);

for(var i = 0; i< filesInDirectory.length;i++ ){
    if(filesInDirectory[i] == "node_modules.zip"){
        filesInDirectory.splice(i,1);
    }
}

// For each loop to check the Node files in Directories.
filesInDirectory.forEach(file => {
    localDirectory = directory;
    localDirectory = directory+"\\"+file;
    console.log(localDirectory);

    var filesInSubDirectory = fs.readdirSync(localDirectory);
    
// For each loop to check whether its a node modules in SubDirecteries or not
    filesInSubDirectory.forEach(f => {

        var dir = localDirectory+"\\"+f;
        var fileStat = fs.statSync(dir);

        if(fileStat.isDirectory() == true && f == "node_modules"){
            archive.directory(dir,false);
        }

    })

})

archive.finalize();
/*----------------------------------------------------------------------------END OF THE FILE ------------------------------------------------------------------------------------------*/