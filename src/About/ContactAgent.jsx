import React from 'react'

function ContactAgent(props) {
    const {id, handleChange, sendEmail} = props;
    return(
        <div>
            <input type="text" name="name" onChange={handleChange} />
            <br/>
            <input type="email" name="email" onChange={handleChange} />
            <br/>
            <input type="text" name="message" onChange={handleChange} />
            <br/>
            <button onClick={() => sendEmail(id)}>Send Email</button>
        </div>
    )
}

export default ContactAgent;