import React, { Component } from 'react';
import ItemDetails, {Field} from '../itemDetails';
import GotService from '../../services/gotService';

export default class BookItem extends Component {
    gotService = new GotService();

    render (){
        return(
            <ItemDetails 
            itemId={this.props.bookId}
            gotData={this.gotService.getBook}
            pageItem={"book"}           >
                <Field field='numberOfPages' label='Pages'/>
                <Field field='publisher' label='Published'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )
    }
}