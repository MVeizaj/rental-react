import React from 'react';

function PropertiesSearch(props) {
    const {search, handleChange, keyUpHandle} = props;
    return (
        <div>
            <label>Search </label>
            <input type="text" name="search" onChange={handleChange}
                   defaultValue={search} onKeyUp={keyUpHandle}/>
        </div>
    );
}

export default PropertiesSearch;