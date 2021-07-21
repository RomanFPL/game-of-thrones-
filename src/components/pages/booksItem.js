import React, { Component } from 'react';
import ItemDetails, {Field} from '../itemDetails';
import GotService from '../../services/gotService';

export default class BooksItem extends Component {
    gotService = new GotService();

    state = {
        selectedBook: 3
    }

    render(){
        return (
            <ItemDetails 
            itemId={this.state.selectedBook}
            gotData={this.gotService.getCharacter}        >
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )
    }
}