import React, { useState, useEffect } from 'react';
export default function SignupLOginLOgout(props) {

    const signUp = async (event) => {
        event.preventDefault();
        //Getting value from useRef()
        const email = event.target.email.value;
        const password = event.target.password.value;
        //Validation
        if (!email || !email.includes('@') || !password) {
            alert('Invalid details');
            return;
        }
        //POST form values 
        const res = await fetch('/api/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        //Await for data for any desirable next steps  
        const data = await res.json();
    };
    
    return <form onSubmit={(event) => signUp(event)}>
             <label>Email
                <input type="text" name="email" />
             </label>
             <label>Password
                <input type="text" name="password" />
             </label>
             <button ttpe="submit">Sign up</button>
           </form>
}