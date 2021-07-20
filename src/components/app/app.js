import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BookPage, HousePage, BookItem} from '../pages';
import ErrorMessage from '../errorMessage';
import './app.css'
import { BrowserRouter as Router, Route} from 'react-router-dom';


export default class App extends Component {
    state={
        showRandomChar: true,
        error: false
    }

    componentDidCatch(){
        console.log('error');
        this.setState({
            error: true
        })
    }


    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChart: id
        })
    }

    render(){
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const char = this.state.showRandomChar ? <RandomChar/> : null;
        
        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button 
                                    className="toggle-btn"
                                    onClick={this.toggleRandomChar}>Toggle random character</button>
                            </Col>
                        </Row>
                    <Route path="/" exact component={() => <h1>Welcome to GofT</h1>}/>
                    <Route path="/characters" component={CharacterPage}/>
                    <Route path="/books" exact component={BookPage}/>
                    <Route path="/houses" component={HousePage}/>
                    <Route path="/books/:id" render={
                        ({match})=>{
                            const {id} = match.params;
                            return <BookItem bookId={id}/>
                        }
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }
}
