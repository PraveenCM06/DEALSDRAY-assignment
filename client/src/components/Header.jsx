import {useSelector, useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {signOutUserStart, signOutUserSuccess, signOutUserFailure} from '../redux/user/userSlice.js'
function Header() {
    const {currentUser} = useSelector((state)=>state.user)
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const handleSignOut = async ()=>{
        try {
          dispatch(signOutUserStart());
          const response = await fetch('/api/auth/signout');
          const data = await response.json();
          if(data.success === false){
            dispatch(signOutUserFailure(data.message))
            return;
          }
          dispatch(signOutUserSuccess(data));
          navigate('/signin');
        } catch (error) {
          dispatch(signOutUserFailure(error.message));
        }
      };
  return (
    <nav className='flex justify-between p-5 bg-slate-300'>
        <div className='flex gap-7 mx-4'>
            <Link to='/home'><h2>Home</h2></Link>
            <Link to='/addemp'><h2>Add Employee</h2></Link>
            <Link to='/getemployees'><h2>Employee List</h2></Link>
        </div>
        <div className='flex gap-7 mx-4'>
            <h2>{currentUser.username}</h2>
            <button onClick={handleSignOut}>Logout</button>
        </div>
    </nav>
  )
}

export default Header;