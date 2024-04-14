import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {useSelector} from 'react-redux';
import { useNavigate , useParams} from "react-router-dom";
function EditEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    photo: ""
  });
  const [image, setImage] = useState('');
  const {currentUser} = useSelector(state=>state.user);
  const navigate= useNavigate();
  const params =useParams();

  useEffect(()=>{
    const getall = async()=>{
        try {
            const response = await fetch(`/api/auth/getemp/${params.id}`);
            const data = await response.json();
            setFormData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    getall();
},[]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const config = {
      method: "POST",
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify(formData)
    }
    console.log(formData);
    const result = await fetch(`/api/auth/editemployee/${params.id}`, config);
    const data= await result.json();
    navigate('/getemployees');
    if(data.success==='false'){
      console.log('data.success===false');
    }
  }
  catch(error){
    console.log(error);
  }
}
  
const converToBase64 = (e) => {
  let reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = () => {
    const imageDataUrl = reader.result;
    setImage(imageDataUrl);
    setFormData({...formData, photo: imageDataUrl})
  };
  reader.onerror = (error) => {
    console.error("Error", error);
  };
};


const handleChange = (e) => {
  if (e.target.id === "mca" || e.target.id === "bca" || e.target.id === "be") {
    if (e.target.checked) {
      setFormData({
        ...formData,
        course: [...formData.course, e.target.id], 
      });
    } else {
      setFormData({
        ...formData,
        course: formData.course.filter(course => course !== e.target.id), 
      });
    }
  } else if (e.target.name === "gender") {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  } else {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
};


  
  return (
    <div >
      <Header />
      <div className="min-w-full flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center w-80 gap-3 m-5 p-5 border border-slate-400 rounded-lg">
        <div className="flex gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="border border-slate-300"
            required
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="border border-slate-300"
            required
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="mobile">Mobile No.</label>
          <input
            id="mobile"
            type="tel"
            placeholder="Mobile"
            className="border border-slate-300"
            required
            onChange={handleChange}
            value={formData.mobile}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="designation">Designation</label>
          <select
            id="designation"
            className="border border-slate-300"
            required
            onChange={handleChange}
            value={formData.designation}
          >
            <option disabled value="">
              Select
            </option>
            <option value="developer">Developer</option>
            <option value="hr">HR</option>
            <option value="manager">Manager</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label>Gender</label>
          <div className="flex items-center gap-1">
          <input
            id="male"
            name="gender"
            type="radio"
            className="border border-slate-300"
            onChange={handleChange}
            value="male"
            checked={formData.gender==='male'}
          />
          <label htmlFor="male">Male</label>
          <input
            id="female"
            name="gender"
            type="radio"
            className="border border-slate-300"
            onChange={handleChange}
            value="female"
            checked={formData.gender==='female'}

          />
          <label htmlFor="female">Female</label>
          <input
            id="others"
            name="gender"
            type="radio"
            className="border border-slate-300"
            onChange={handleChange}
            value="others"
            checked={formData.gender==='others'}

          />
          <label htmlFor="others">Prefer not to say</label>
          </div>
        </div>
        <div className="flex flex-col">
          <label>Course</label>
          <div className="flex gap-2">
          <div>
            <input
              type="checkbox"
              id="mca"
              onChange={handleChange}
              checked={formData.course.includes('mca')}
            />
            <label htmlFor="mca">MCA</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="bca"
              onChange={handleChange}
              checked={formData.course.includes('bca')}
              
            />
            <label htmlFor="bca">BCA</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="be"
              onChange={handleChange}
              checked={formData.course.includes('be')}
              
            />
            <label htmlFor="be">BE</label>
            </div>
          </div>
        </div>
        <div>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={converToBase64}
          />
        </div>
        {image=="" || image == null ? "" : <img src={image} height='100' width='100'/>}
        <button type="submit" className="bg-green-300 py-2 px-5">
          Submit
        </button>
      </form>
      </div>
    </div>
  );
}

export default EditEmployee;