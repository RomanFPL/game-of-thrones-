import React, { Component } from 'react';
import RowBlock from '../rowBlock/rowBlock';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';

export default class CharacterPage extends Component {
    gotService = new GotService();

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

        const itemList = (
            <ItemList 
            onCharSelected={this.onCharSelected}
            gotData={this.gotService.getAllCharacters}
            renderItem={({name, gender}) => `${name} ${gender}`}/>
        )

        const charDetails = (
            <CharDetails charId={this.state.selectedChart} />
        )

        return(
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}