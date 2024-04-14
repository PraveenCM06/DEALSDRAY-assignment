import express from 'express';
import {signUp, signIn, signOut, employeeAdd, getEmployees, deleteEmployee, editEmployee, getOneEmp} from '../controllers/auth.controller.js'

const router = express.Router();

router.post('/signup', signUp);
router.post('/empadd', employeeAdd);
router.post('/signin', signIn);
router.get('/signout', signOut);
router.get('/getemployees', getEmployees);
router.get('/getemp/:id', getOneEmp)
router.delete('/deleteEmployee/:id', deleteEmployee);
router.post('/editemployee/:id', editEmployee)

export default router;