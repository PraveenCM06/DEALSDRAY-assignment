import { useState } from 'react'
import heroimg from '../assets/dealsdray_logo.jpeg'
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js';

function Login() {
  const [formData, setFormData] = useState({});
  const {loading, error}= useSelector((state)=>state.user);
  const dispatch = useDispatch();
const navigate = useNavigate();
  
  const handleChange =(e)=>{
    setFormData({...formData, [e.target.id]:e.target.value})
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart);
      const config = {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      }
      const res = await fetch ('/api/auth/signin', config );
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/home');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <section className="flex min-h-screen justify-center items-center flex-col">
      <img src={heroimg} alt="company_logo" />
        <form onSubmit={handleSubmit} className="bg-slate-400 p-16 rounded-2xl flex flex-col gap-4">
            <div className="bg-white flex gap-2 p-2 rounded-lg">
            <label htmlFor="email">Email</label>
            <input className="focus:outline-none" id="email" type="text" placeholder="User Name" onChange={handleChange}/>
            </div>
            <div className="bg-white flex gap-4 p-2 rounded-lg">
                <label htmlFor="password">Password</label>
                <input className="focus:outline-none" type="password" id="password" placeholder="Password" onChange={handleChange}/>
            </div>
            <button className="bg-green-600 text-white p-2 rounded-lg">Login</button>
        </form>
        {error && <p className='text-red-700'>{error}</p>}
    </section>
  )
}

export default Login;