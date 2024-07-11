import dotenv from "dotenv";
import connecDb from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./env"
})
connecDb()
.then(()=>{

    app.on("error", (err)=>{
        console.log("Error:  IN RUNNING APP", err);
        throw err
    })
    app.listen(process.env.PORT, ()=>{
        console.log("listening on port", process.env.PORT);
    })
})
.catch((err) => console.log("mongo db connection faild", err))




 










// ( async ()=>{
//      try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

//         app.on("error", function(error) { 
//             console.log("Error: " + JSON.stringify(error)); 
//             throw error
//         })

//         app.listen(process.env.PORT, function() { 
//             console.log("listening on port " + process.env.PORT);
//         })

//      } catch (error) {
//         console.log(error);
//         throw error
//      }
// })()