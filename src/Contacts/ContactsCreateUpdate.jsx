import React from 'react';

function ContactsCreateUpdate(props) {
    const {valueName, valueEmail, valueMobile, valueNotes, handleChange, handleSubmit, buttonName} = props;
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" defaultValue={valueName} onChange={handleChange} required/>
            <br/>
            <input type="email" name="email" defaultValue={valueEmail} onChange={handleChange} required/>
            <br/>
            <input type="text" name="mobile" defaultValue={valueMobile} onChange={handleChange} required/>
            <br/>
            <input type="text" name="notes" defaultValue={valueNotes} onChange={handleChange} required/>
            <br/>
            <input type="submit" value={buttonName}/>
        </form>
    );
}

export default ContactsCreateUpdate;