import React, { useState } from 'react';
import {Link ,useNavigate} from "react-router-dom";
import { signInStart,signInFailure,signInSuccess } from '../redux/user/slice.js';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';


function SignIn(props) {
    const[formdata,setformdata] = useState({});
    const {error ,loading } = useSelector((state) =>state.user);
    const navigate =useNavigate();
    const dispatch = useDispatch();

    function handleChange(e) {
        setformdata({...formdata , [e.target.id] : e.target.value})
    }

    async function handleSubmit(e) {
          e.preventDefault();
        try {
            dispatch(signInStart());
        const res = await fetch("/api/auth/signin" ,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify(formdata),
        }); //we add a proxy in vite.config.js file
        const data = await res.json();
        if(data.success === false){
            dispatch(signInFailure(data));
            return;
        }
        dispatch(signInSuccess(data));
        navigate('/');
        } catch (error) {
            dispatch(signInFailure(error))
        }
        
    }


    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-3xl text-center mb-5'>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input type='email'  placeholder='email'id='email' className='bg-slate-100 p-3 rounded-lg block mb-2 w-64' onChange={handleChange} />
                <input type='text'  placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg block mb-2 w-64' onChange={handleChange} />
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-64'>{loading ? 'Loading..' : 'Sign In'}</button>
                <OAuth />
            </form>

            <div className='flex gap-2 mt-5'>
                <p> Dont have an account ? </p>
                <Link to ="/signup">
                <span className='text-blue-700'>Sign Up</span>
                </Link>
            </div>
            <div>
                <p className='text-red-700 mt-5'>{error ? error.message ||"something went wrong !" : null}</p>
            </div>
            
        </div>
        
    );
}

export default SignIn;