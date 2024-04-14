import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    designation:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:Array,
    },
    photo: {
        type:String,
        default:"https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
    },
}, {timestamps:true}); 
const Employee = mongoose.model('Employee', userSchema);

export default Employee;