import React, { Component } from 'react';
import RowBlock from '../rowBlock/rowBlock';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';

export default class BookPage extends Component {
    gotService = new GotService();

    state = {
        selectedBook: null,
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }
    
    
    
    render (){
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
            onItemSelected={this.onItemSelected}
            gotData={this.gotService.getAllBooks}
            renderItem={({name}) => name}/>
        )

        const charDetails = (
            <ItemDetails 
            itemId={this.state.selectedBook}
            gotData={this.gotService.getBook}
            pageItem={"book"}           >
                <Field field='numberOfPages' label='Pages'/>
                <Field field='publisher' label='Published'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )

        return(
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}