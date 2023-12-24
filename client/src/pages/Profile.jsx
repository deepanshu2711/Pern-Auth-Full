import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserfaliure, deleteUserStart, deleteUserSuccess, deleteUserfaliure ,signout} from '../redux/user/slice.js';

function Profile(props) {
    const dispatch = useDispatch();
    const {currentUser ,loading} = useSelector((state) => state.user);
    const[formdata , setFormdata] = useState({username:currentUser.username , email:currentUser.email });
    const[updatesuccess,setUpdatesuccess] = useState(false);

    function handleChange(e){
        e.preventDefault();
        setFormdata({...formdata , [e.target.id] : e.target.value});
    }
    async function handleSubmit(e){
        e.preventDefault();
        
        try {
            
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser.id}` ,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify(formdata)
            });
            const data = await res.json();
            
            if(data.success === false){
                dispatch(updateUserfaliure(data));
                return;
            }
            dispatch(updateUserSuccess(data));
            
            
        } catch (error) {
            dispatch(updateUserfaliure(error));
        }
    }

    async function handleDelete(){
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser.id}` ,{
                method:'DELETE'
            });
            const data = await res.json();
            if(data.success === false){
                dispatch(deleteUserfaliure(data));
                return;
            }
            dispatch(deleteUserSuccess(data));
            
        } catch (error) {
            dispatch(deleteUserfaliure(error))
        }
    }
    
     async function handleSignout(){
        try {
            await fetch('/api/auth/signout');
            dispatch(signout());

        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col' onSubmit={handleSubmit}>  
                <img className='h-24 w-24 self-center cursor-pointer rounded-full object-cover' src={currentUser.profilepicture} alt='profileimage' />
                <input defaultValue={currentUser.username}  type='text' id='username' placeholder='Username' className='bg-slate-100 p-3 rounded-lg mt-2' onChange={handleChange}/>
                <input defaultValue={currentUser.email}  type='email' id='email' placeholder='Email' className='bg-slate-100 p-3 rounded-lg mt-2' onChange={handleChange}/>
                <input  type='text' id='password' placeholder='Password' className='bg-slate-100 p-3 rounded-lg mt-2' onChange={handleChange}/>
                <button className='bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-95 default:opacity-85 mt-2'>Update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer' onClick={handleSignout}>Sign Out</span>

            </div>
            
        </div>
    );
}

export default Profile;