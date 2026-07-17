import http from "node:http"
import express from "express"
import path from "path"
 
async function main (){
          
          const app = express()  // express app
          const server = http.createServer(app) // htttp server
          const PORT = process.env.PORT || 8080;


          // express
          app.use(express.static(path.resolve("./public")))

          app.get("/health", (req, res) => {
                    res.send("HELLO! helathy")
          })

        


          server.listen(PORT, () => {
                    console.log(`server is running`)
          })

          
          
}