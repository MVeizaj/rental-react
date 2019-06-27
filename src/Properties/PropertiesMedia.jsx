import React from 'react';

class PropertiesMedia extends React.Component {
    state = {
        id: this.props.id,
        mediaId: []
    };

    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.setState({
                id: nextProps.id,
                imageHash: nextProps.imageHash
            });
        }
        setImmediate(() => this.loadData());
    }

    loadData = () => {
        const {id} = this.state;

        const requestOption = {
            method: "GET"
        };

        fetch(`http://127.0.0.1:8000/api/property/${id}/media`, requestOption)
            .then(res => res.json())
            .then(mediaId => (
                this.setState({
                    mediaId
                })
            ));
    };

    render() {
        const {mediaId} = this.state;
        const houseImage = require("../Images/58927031-abstract-vector-simple-house-with-horizon-line-best-for-use-in-graphic-design-as-a-corporate-symbol-.jpg");

        return (
            <div>
                {mediaId.media && mediaId.media.length === 0 &&
                <img src={houseImage} alt={`house-avatar`} width="300" height="150"/>}
                {mediaId.media && mediaId.media.map(photo => (
                    <img src={`http://127.0.0.1:8000/api/media/${photo.id}`}
                         alt={`media${photo.id}`}/>
                ))}
            </div>
        );
    }
}

export default PropertiesMedia;