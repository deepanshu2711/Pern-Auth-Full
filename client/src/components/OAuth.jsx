import React from 'react';
import { GoogleAuthProvider, signInWithPopup ,getAuth } from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/slice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
        const dispatch = useDispatch();
        const navigate = useNavigate();
    async function handleGoogleClick() {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth ,provider);
            const res = await fetch('/api/auth/google',{
                method: "POST",
                headers:{
                    'Content-Type' :"application/json",
                },
                body:JSON.stringify({
                    name :result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL,
                })
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log("could not login with google" , error)
        }    
    }


    return (
        <div>
            <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white uppercase rounded-lg p-3 mt-3 w-64'>Continue with google</button>
        </div>
    );
}

export default OAuth;