import React from 'react'
import {Link} from 'react-router-dom'
import Landingpage from "../CSS/Landingpage.module.css"
export default function LandingPage(){
    return(
        <div className={Landingpage.Container}>

            <h1 className={Landingpage.Text}>Cook book</h1>
            
            <Link to="/home"><button className={Landingpage.Button}>Join now!</button></Link>
        </div>
    )

    
}