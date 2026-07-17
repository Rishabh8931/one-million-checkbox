import http from "node:http"
import express from "express"
import path from "path"
import { Server } from "socket.io"


 const CHECKBOX_SIZE = process.env.CHECKBOX_SIZE || 10000
const state = {
          checkboxes : new Array(CHECKBOX_SIZE).fill(false)
}
 
async function main (){
          
          const app = express()  // express app
          const server = http.createServer(app) // htttp server
          const PORT = process.env.PORT || 8080;

          // seckets
          const io = new Server()
          io.attach(server)

          io.on("connection", (socket) => {
                    console.log(`socketId: ${socket.id} connected`)
                    socket.on("client:checkbox:change", (data) => {
                              const {index, checked} = data
                              state.checkboxes[index] = checked

                              io.emit('server:checkbox:change', data)
                    })
          })


          // express
          app.use(express.static(path.resolve("./public")))

          app.get('/checkboxes' , (req, res) => {
                    return res.json({checkboxes : state.checkboxes})
          })


          app.get("/health", (req, res) => {
                    res.send("HELLO! helathy")
          })

        


          server.listen(PORT, () => {
                    console.log(`server is running`)
          })

          
          
}


main()