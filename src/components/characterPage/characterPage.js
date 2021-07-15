import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';

export default class CharacterPage extends Component {
    
    state = {
        selectedChart: 130
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChart: id
        })
    }
    
    
    
    render (){
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return(
        <Row>
            <Col md='6'>
                <ItemList onCharSelected={this.onCharSelected}/>
            </Col>
            <Col md='6'>
                <CharDetails charId={this.state.selectedChart} />
            </Col>
        </Row>
        )
    }
}