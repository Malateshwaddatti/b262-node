const fs= require("fs");
const os =require("os");
//console.log("Hello Guvi!!!");

//const marks=[80,20,50,90,10,50];
//console.log(Math.min(...marks));
function Double(){
    return num*2;
}
//console.log("the double is :"+Double(num));
const num=process.argv[2];
console.log("the double is :"+Double(num));

//console.log(process.argv);
//console.log("the Free memory is :"+ os.freemem());
//console.log("total memory is :"+ os.totalmem());
//console.log(process.arch);
fs.readFile("./index.text","utf8",(err,data)=>{
    
    console.log(data,"Jeevitha and Yashu");
    
})
const data=fs.readFileSync("./index.text","utf8");
console.log(data);
fs.writeFile("./good.js",data ,()=>{
console.log("the completed writing ");
})

fs.copyFile("./index.js","./awsome.js",()=>{
    console.log("the file is copyid");
})