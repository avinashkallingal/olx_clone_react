import React, { useContext, useEffect } from 'react'

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';
import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import { AuthContext } from '../store/Context';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { AuthUserContext } from '../authentication/config';
const Home = () => {

    const {user,setUser}=useContext(AuthContext)
    const {logged}=useContext(AuthUserContext)
    const auth = getAuth();
    console.log(user)
    const navigate=useNavigate()
    useEffect(()=>{
        if(!logged){
            navigate('/login')
        }
    })
    return (
        <div>
            <Header />
          
            <Banner />
            <Posts />
            <Footer />
           
        </div>
    )
}

export default Home
