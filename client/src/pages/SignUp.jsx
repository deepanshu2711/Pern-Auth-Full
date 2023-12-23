import React from 'react';
import {Link} from "react-router-dom";

function SignUp(props) {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-3xl text-center mb-5'>Sign Up</h1>
            <form>
                <input type='text'  placeholder='username' id='username' className='bg-slate-100 p-3 rounded-lg block mb-2 w-64' />
                <input type='email'  placeholder='email'id='email' className='bg-slate-100 p-3 rounded-lg block mb-2 w-64' />
                <input type='text'  placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg block mb-2 w-64' />
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-64'>Sign Up</button>
            </form>

            <div className='flex gap-2 mt-5'>
                <p>Have an account ? </p>
                <Link to ="/signin">
                <span className='text-blue-700'>Sign in</span>
                </Link>
            </div>
            
        </div>
        
    );
}

export default SignUp;