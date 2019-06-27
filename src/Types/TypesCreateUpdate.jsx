import React from 'react';

function TypesCreateUpdate(props) {
    const {value, handleChange, handleSubmit, buttonName} = props;
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" defaultValue={value} onChange={handleChange} required/>
            <input type="submit" value={buttonName}/>
        </form>
    );
}

export default TypesCreateUpdate;