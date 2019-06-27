import React from "react";
import {Link} from "react-router-dom";
import PropertiesMedia from "../Properties/PropertiesMedia";

class Results extends React.Component {

    render() {
        const {id, name, area} = this.props;
        return (
            <div>
                <PropertiesMedia id={id} />
                <h4 key={id}><b>{name} {area}</b></h4>
                <Link to={"/property/" + id}>More Info</Link>
            </div>
        )
    }
}

export default Results;