import React from 'react';
import { useSelector } from 'react-redux';

function Profile(props) {
    const {currentUser} = useSelector((state) => state.user);

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col'>
                <img className='h-24 w-24 self-center cursor-pointer rounded-full object-cover' src={currentUser.profilepicture} alt='profileimage' />
                <input defaultValue={currentUser.username}  type='text' id='username' placeholder='Username' className='bg-slate-100 p-3 rounded-lg mt-2'/>
                <input defaultValue={currentUser.email}  type='email' id='email' placeholder='Email' className='bg-slate-100 p-3 rounded-lg mt-2'/>
                <input  type='text' id='password' placeholder='Password' className='bg-slate-100 p-3 rounded-lg mt-2'/>
                <button className='bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-95 default:opacity-85 mt-2'>Update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer'>Sign Out</span>

            </div>
        </div>
    );
}

export default Profile;