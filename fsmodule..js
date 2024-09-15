// node js practica

// ? write file 
const fs  = require('fs');

// const  write= fs.writeFile("hey.text", "hey hello ashish" ,function(err){
//  if(err) console.log(err.message )
//     else  console.log("done")
// } )

//? append file 



// const  append= fs.appendFile("hey.text", "  how are you  " ,function(err){
//  if(err) console.log(err.message )
//     else  console.log("done")
// } )

// rename 


    // fs.rename("hello.text", "hi.txt", function (err) {
    //   if (err) console.log(err.message);
    //   else console.log('File Renamed!');
    // });
 
    //? COPY FILE

    // fs.copyFile("hi.txt", "coopyed.txt", (err)=>{
    //     if(err) console.log(err.message)
    //     else console.log("file copied")
    // } ) 

    // ? unLink (delete file)

    //  fs.unlink("coopyed.txt",(err)=>{
    //   if(err) console.log(err.message)
    //   else console.log("file deleted")
    //  } )

    //? rmdir ( remove directory)

    // ! 1st way 

        // fs.rmdir("./copy", {recursive: true}, (err)=>{
        //   if(err) console.log(err.message)
        //   else console.log("directory deleted")
        // })

    // ! 2nd way

    //  fs.rm("./copy", {recursive: true}, (err)=>{
    //       if(err) console.log(err.message)
    //       else console.log("directory deleted")
    //     })

    // ? make folder or direactory 

    //  fs.mkdir("./copy",(err)=>{
    //    if(err) console.log(err.message)
    //    else console.log("directory created")
    //  } )

    // ? read file
      
     fs.readFile("hi.txt", 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    