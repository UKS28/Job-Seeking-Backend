import app from "./app.js";

const PORT= process.env.PORT;

const startServer=()=>{
    app.listen(PORT,()=>
    console.log(`server running on port ${PORT}`)
    );
}

startServer();