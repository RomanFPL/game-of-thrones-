import React, { Component } from 'react';
import RowBlock from '../rowBlock/rowBlock';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';

export default class CharacterPage extends Component {
    gotService = new GotService();

    state = {
        selectedChart: null,
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
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
            onItemSelected={this.onItemSelected}
            gotData={this.gotService.getAllCharacters}
            renderItem={({name, gender}) => `${name} ${gender}`}/>
        )

        const charDetails = (
            <ItemDetails itemId={this.state.selectedChart}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )

        return(
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}