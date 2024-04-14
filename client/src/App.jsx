import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AddEmp from './pages/AddEmp';
import GetEmployees from './pages/GetEmployees';
import EditEmployee from './pages/EditEmployee';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/addemp' element={<AddEmp/>}/>
        <Route path='getemployees' element={<GetEmployees/>}/>
        <Route path='/editemployee/:id' element={<EditEmployee/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
