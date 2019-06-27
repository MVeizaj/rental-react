import React from 'react';

function ZonesCreateUpdate(props) {
    const {valueName, valueDesc, handleChange, handleSubmit, buttonName} = props;
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" defaultValue={valueName} onChange={handleChange} required/>
            <br/>
            <input type="text" name="description" defaultValue={valueDesc} onChange={handleChange} required/>
            <br/>
            <input type="submit" value={buttonName}/>
        </form>
    );
}

export default ZonesCreateUpdate;