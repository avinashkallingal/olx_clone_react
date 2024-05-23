import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import { FirebaseContext } from '../../store/Context';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import Spinner from '../Spinner/Spinner';

const Signup = () => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [spinner, setSpinner] = useState(false);

    const [nameError,setUserNameError]=useState("")
    const [emailError,setEmailError]=useState("")
    const [phoneError,setPhoneError]=useState("")
    const [passwordError,setPasswordError]=useState("")
    
    const navigate = useNavigate()

    //Username validation
    const validateUsername = () => {
        if (username.trim() === '') {
            setUserNameError('Username is required');
            return false;
        }
        setUserNameError('');
        return true;
    };

    //emailvalidation
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            setEmailError('Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
            return false;
        }
        setEmailError('');
        return true;
    };

    //phone validation
    const validatePhone = () => {
        const phoneRegex = /^[0-9]{10}$/;
        if (phone.trim() === '') {
            setPhoneError('Phone number is required');
            return false;
        } else if (!phoneRegex.test(phone)) {
            setPhoneError('Invalid phone number format');
            return false;
        }
        setPhoneError('');
        return true;
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        setSpinner(true);
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                // Signed up 
                const user = userCredential.user;
                console.log(user, './././././././././')
                const db = getFirestore();
                addDoc(collection(db, 'users'), {
                    id: user.uid,
                    userName: username,
                    phoneNo: phone
                }).then(() => {
                    console.log('login page')
                    navigate('/login');
                })
                // ...
            })
            .catch((error) => {
                setSpinner(false);
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage, './.././././')
                const message = errorMessage.split("(auth/")[1].split(")")[0];
                setError(message);

                // ..
            });
    }

    const gotLogin = () => {
        navigate('/login');
    }

    return (
        <div>

            {
                spinner ? <Spinner />
                    :
                    <div className='singupParentDiv'>

                        <img width="200px" height="200px" src="../../../Images/olx-logo.png" alt="image" />
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="">UserName</label>
                            <br />
                            <input onBlur={validateUsername} onChange={(e) => {setUserName(e.target.value);setUserNameError("");validateUsername()}} className='input' type="text" name="" id="" value={username} />
                           <div style={{color:'red',fontSize:'.9vw'}}>{nameError}</div>
                            <br />
                            <label htmlFor="">Email Address</label>
                            <br />
                            <input onBlur={validateEmail} onChange={(e) => {setEmail(e.target.value);validateEmail()}} value={email} className='input' type="text" name="" id="" />
                            <div style={{color:'red',fontSize:'.9vw'}}>{emailError}</div>
                            <br />
                            <label htmlFor="">Phone Number</label>
                            <br />
                            <input onChange={(e) => {setPhone(e.target.value);validatePhone()}} value={phone} className='input' type="number" name="" id="" />
                            <div style={{color:'red',fontSize:'.9vw'}}>{phoneError}</div>
                            <br />
                            <label htmlFor="">Password</label>
                            <br />
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='input' type="password" name="" id="" />
                            <br />
                            <span style={{ marginBottom: "3%", color: "red" }}>
                                {
                                    error ? error : ""
                                }
                            </span>

                            <br />
                            <button className='submit' type='submit'>Submit</button>
                        </form>
                        <div className='login'>
                            <a onClick={gotLogin}>Login</a>
                        </div>
                    </div>
            }

        </div>

    )
}

export default Signup
