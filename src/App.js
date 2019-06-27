import React from 'react';
import './App.css';
import Header from "./Header";
import Footer from "./Footer";

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Footer/>
            </div>
        )
    }
}

export default App;
