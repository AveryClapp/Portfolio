import React from "react"
import styles from "./contact.css"


const Contact = () => {
    return (
        <section className="wrapper">
            <h1>Get In Touch!</h1>
            <input className="name" type="text"  placeholder="Full Name"></input>
            <input className="email" type="email" placeholder="Your Email"></input>
            <textarea className="message" placeholder="Enter your Message Here"></textarea>
        </section>
    )   
}


export default Contact;