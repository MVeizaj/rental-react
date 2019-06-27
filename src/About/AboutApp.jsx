import React from 'react';
import AgentsAbout from "./AgentsAbout";
import AboutUs from "./AboutUs";

class AboutApp extends React.Component {
    state = {
        data: {
            count: 0,
            page: 0,
            total: 0,
            totalPages: 0,
            agents: []
        }
    };

    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleFirst = this.handleFirst.bind(this);
        this.handleLast = this.handleLast.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = (page = 1) => {
        const requestOption = {
            method: "GET"
        };

        fetch("http://127.0.0.1:8000/api/agents?page=" + page, requestOption)
            .then(res => res.json())
            .then((data) => {
                    this.setState({
                        data
                    });
                }
            )
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    };

    handleShow = (id) => {
        console.log(id)
    };

    handleFirst = () => {
        this.loadData(1);
    };

    handlePrevious = () => {
        const {page} = this.state.data;
        this.loadData(parseInt(page) - 1);
    };

    handleNext = () => {
        const {page} = this.state.data;
        this.loadData(parseInt(page) + 1);
    };

    handleLast = () => {
        const {totalPages} = this.state.data;
        this.loadData(totalPages);
    };

    render() {
        const {total, page, totalPages} = this.state.data;
        const {data} = this.state;
        return (
            <div>
                <div>
                    <AboutUs/>
                </div>
                <hr/>
                <h1>Agents</h1>
                {data.agents && data.agents.map(agent => (
                        <AgentsAbout id={agent.id} firstName={agent.firstname} lastName={agent.lastname}
                                     handleShow={(event) => this.handleShow(agent.id, event)} page={page}/>
                    )
                )}
                {total > 10 &&
                <div>
                    {(page > 1) && <button onClick={this.handleFirst}>First</button>}
                    {(page > 1) && <button onClick={this.handlePrevious}>Previous</button>}
                    <button>{page}</button>
                    {(page < totalPages) && <button onClick={this.handleNext}>Next</button>}
                    {(page < totalPages) && <button onClick={this.handleLast}>Last</button>}
                </div>
                }
            </div>
        )
    }
}

export default AboutApp;