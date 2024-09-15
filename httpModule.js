 const http =  require("http")


 const server= http.createServer(function(req, res){
     res.write("hello word")
     res.end()  // to end the response
 })
 server.listen(3000, function(){
     console.log("server is running on port 3000")
 })