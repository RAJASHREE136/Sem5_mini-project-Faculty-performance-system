import mongoose from "mongoose";
mongoose.connect("mongodb://0.0.0.0:27017/credentialsdb")
.then(() =>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect")
})

const LogInSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users", LogInSchema);
export default collection;