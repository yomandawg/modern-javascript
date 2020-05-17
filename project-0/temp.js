var fs = require('fs');

var startTime = new Date().getTime();
var filenames = fs.readdirSync('.');  
var i;  
for (i = 0; i < filenames.length; i++) {  
    console.log(filenames[i]);
}


var endTime = new Date().getTime();
console.log(endTime - startTime);


var startTime = new Date().getTime();

var fs = require('fs');

fs.readdir('.', function (err, filenames){  
    var i;
    for (i = 0; i < filenames.length; i++) {
        console.log(filenames[i]);
    }
});

var endTime = new Date().getTime();
console.log(endTime - startTime);