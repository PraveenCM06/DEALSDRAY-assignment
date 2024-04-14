import User from "../models/user.model.js";
import Employee from "../models/employee.model.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json("User created Successfully!");
    } catch (error) {
      return next(error);
    }
  };


export const employeeAdd = async (req,res,next) =>{
    const {name, email, mobile, designation, gender, course, photo}= req.body;
    const newEmp = new Employee({name, email, mobile, designation, gender, course, photo});
    try {
        await newEmp.save();
        res.status(200).json(newEmp);
    } catch (error) {
        return next(error);
    }
}

  export const signIn = async (request, response, next)=>{
        const {email, password} = request.body;
        try {
            const validUser = await User.findOne({email});
            if(!validUser){
      return next(errorHandler(404, "User not found"));
            }
            const validPassword = bcryptjs.compareSync(password, validUser.password);
            if(!validPassword){
              return next(
                errorHandler(
                  401,
                  "Wrong Credentials, please try with valid email and Password"
                )
              );
            }
            const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
            response.cookie("access_token", token, {httpOnly:true}).status(200).json(validUser);
        } catch (error) {
            next(error);
        }
  }

  export const signOut = async (request, response, next)=>{
    try {
      response.clearCookie('access_token');
      response.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  }

  export const  getEmployees = async (req,res,next)=>{
    try {
      const listings = await Employee.find().then(e=>res.send(e));
    } catch (error) {
      next(error);
    }
  }

  export const deleteEmployee = async (req,res,next)=>{
    const list = Employee.findById(req.params.id);
    if(!list){
      return next(errorHandler(404, 'User Not Found'))
    }
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.status(200).json("Employee deleted Successfully")
    } catch (error) {
      next(error);
    }
  }

  export const getOneEmp = async (req, res, next)=>{
    try {
        const emp = await Employee.findById(req.params.id);
        if(!emp){
            return next(errorHandler(404, 'empployee not found!'));
        }
        res.status(200).json(emp);
    } catch (error) {
        next(error)
    }
};

  export const editEmployee = async (req,res,next)=>{
    const emp= await Employee.findById(req.params.id)
      if(!emp){
        return next(errorHandler(404, 'Something went wrong..'));
      }
    try {
        const editemp = await Employee.findByIdAndUpdate(
          req.params.id,
          req.body,
          {new:true}
        );
        res.status(200).json(editemp);
    } catch (error) {
      next(error);
    }
  }