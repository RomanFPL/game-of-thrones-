import React, { Component } from 'react';
import RowBlock from '../rowBlock/rowBlock';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
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
            <CharDetails charId={this.state.selectedChart}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </CharDetails>
        )

        return(
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}