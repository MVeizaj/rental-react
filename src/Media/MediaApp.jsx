import React from 'react'

class MediaApp extends React.Component {
    state = {
        media: null,
        isVideo: 0,
        mediaId: [],
        response: [],
        alertMessage: false
    };

    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        const id = this.props.match.params.id;

        const requestOption = {
            method: "GET"
        };

        fetch("http://127.0.0.1:8000/api/property/" + id + "/media", requestOption)
            .then(res => res.json())
            .then(mediaId => (
                this.setState({
                    mediaId
                })
            ))
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    };

    onChangeHandler = event => {
        this.setState({
            media: event.target.files
        })
    };

    onClickHandler = () => {
        const {media, isVideo} = this.state;
        const id = this.props.match.params.id;

        if (media === null) {
            alert("Upload a file!");
        } else {
            const data = new FormData();
            for (const file of media) {
                data.append('media[]', file);
            }
            // data.append('media', media);
            data.append('isVideo', isVideo);

            const requestOption = {
                method: "POST",
                body: data
            };

            fetch("http://127.0.0.1:8000/api/property/" + id + "/media", requestOption)
                .then(res => res.json())
                .catch(error => {
                    alert(error.message)
                })
                .then(response => {
                    this.setState({
                        response: response,
                        alertMessage: true
                    })
                })
                .then(this.loadData);
        }

    };

    handleDelete = id => {
        const requestOption = {
            method: "DELETE"
        };

        fetch("http://127.0.0.1:8000/api/media/" + id, requestOption)
            .then(res => res.json())
            .then(response => {
                alert(response.message);
                this.setState({
                    alertMessage: false
                });
                this.loadData();
            })
            .catch(error => {
                alert(error.message);
                this.loadData();
            })
    };

    closeAlert = () => {
        this.setState({
            alertMessage: false
        })
    };

    render() {
        const {mediaId, response, alertMessage} = this.state;
        return (
            <div>
                {alertMessage && response.notification.map(alert => (
                    <div>
                        <span key={alert.filename}
                              defaultValue={alert.filename}>{alert.filename}: {alert.message}</span>
                    </div>

                ))}
                {alertMessage && <div>
                    <button onClick={() => this.closeAlert()}>x</button>
                </div>}
                <input type="file" name="media" onChange={this.onChangeHandler} multiple/>
                <br/>
                <label>Media Type: <select name="isVideo" onChange={this.handleChange}>
                    <option value="0">Photo</option>
                    <option value="1">Video</option>
                </select></label>
                <br/>
                <button onClick={this.onClickHandler}>Upload</button>
                <br/>
                {mediaId.media && mediaId.media.map(photo => (
                    <div>
                        <img src={"http://127.0.0.1:8000/api/media/" + photo.id} alt={"media" + photo.id}/>
                        <button onClick={() => {
                            if (window.confirm('Are you sure?')) this.handleDelete(photo.id)
                        }}>X
                        </button>
                    </div>
                ))}
            </div>
        );
    }
}

export default MediaApp;