import React from 'react';
import TypesSelect from "../SelectForm/TypesSelect";
import ZonesSelect from "../SelectForm/ZonesSelect";
import ContactsSelect from "../SelectForm/ContactsSelect";

function PropertiesCreateUpdate(props) {
    const {
        valueName, valueDesc, valueAddr, valueArea, valueNotes, valuePrice, handleChange, handleSubmit, buttonName,
        valueParking, valueFurniture, valueStatus, isUpdate, valueZone, valueType, valueContact
    } = props;
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" defaultValue={valueName} onChange={handleChange} required/>
            <br/>
            <input type="text" name="description" defaultValue={valueDesc} onChange={handleChange} required/>
            <br/>
            <input type="text" name="address" defaultValue={valueAddr} onChange={handleChange} required/>
            <br/>
            <input type="text" name="area" defaultValue={valueArea} onChange={handleChange} required/>
            <br/>
            <input type="text" name="note" defaultValue={valueNotes} onChange={handleChange} required/>
            <br/>
            <TypesSelect handleChange={handleChange} typeValue={valueType} isUpdate={isUpdate}/>
            <br/>
            <ZonesSelect handleChange={handleChange} zoneValue={valueZone} isUpdate={isUpdate}/>
            <br/>
            <ContactsSelect handleChange={handleChange} contactValue={valueContact} isUpdate={isUpdate}/>
            <br/>
            <select name="hasFurniture" onChange={handleChange}>
                <option>Choose an option</option>
                <option value="1" selected={!!(isUpdate && (valueFurniture === true))}>Yes</option>
                <option value="0" selected={!!(isUpdate && (valueFurniture === false))}>No</option>
            </select>
            <br/>
            <select name="hasParking" onChange={handleChange}>
                <option>Choose an option</option>
                <option value="1" selected={!!(isUpdate && (valueParking === true))}>Yes</option>
                <option value="0" selected={!!(isUpdate && (valueParking === false))}>No</option>
            </select>
            <br/>
            <select name="status" onChange={handleChange}>
                <option>Choose an option</option>
                <option value="1" selected={!!(isUpdate && (valueStatus === true))}>Sale</option>
                <option value="0" selected={!!(isUpdate && (valueStatus === false))}>Rent</option>
            </select>
            <br/>
            <input type="text" name="price" defaultValue={valuePrice} onChange={handleChange} required/>
            <br/>
            <input type="submit" value={buttonName}/>
        </form>
    );
}

export default PropertiesCreateUpdate;