import React from 'react';
import ZonesSelect from "../SelectForm/ZonesSelect";

function UsersCreateUpdate(props) {
    const {
        valueFirstName, valueLastName, valueEmail, valueMobile, valueAddress,
        valueNotes, handleChange, handleSubmit, buttonName, valueZone, isAdmin,
        isUpdate, onChangeHandler
    } = props;
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" defaultValue={valueFirstName} onChange={handleChange} required/>
            <br/>
            <input type="text" name="lastName" defaultValue={valueLastName} onChange={handleChange} required/>
            <br/>
            <input type="email" name="email" defaultValue={valueEmail} onChange={handleChange} required/>
            <br/>
            <input type="text" name="mobile" defaultValue={valueMobile} onChange={handleChange} required/>
            <br/>
            <input type="text" name="address" defaultValue={valueAddress} onChange={handleChange} required/>
            <br/>
            <input type="text" name="notes" defaultValue={valueNotes} onChange={handleChange} required/>
            <br/>
            <select name="isAdmin" onChange={handleChange}>
                <option>Choose an option</option>
                <option value="0" selected={!!(isUpdate && (isAdmin === false))}>Agent</option>
                <option value="1" selected={!!(isUpdate && (isAdmin === true))}>Admin</option>
            </select>
            <br/>
            <ZonesSelect handleChange={handleChange} zoneValue={valueZone} isUpdate={isUpdate} />
            <br/>
            <input type="file" name="photo" onChange={onChangeHandler} />
            <br/>
            <input type="submit" value={buttonName}/>
        </form>
    );
}

export default UsersCreateUpdate;