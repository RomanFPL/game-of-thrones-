import React, { Component } from 'react';
import RowBlock from '../rowBlock/rowBlock';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';

export default class HousePage extends Component {
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
            gotData={this.gotService.getAllHouses}
            renderItem={({name, gender}) => `${name} ${gender}`}/>
        )

        const charDetails = (
            <ItemDetails 
            itemId={this.state.selectedChart}
            gotData={this.gotService.getHouse}        >
                <Field field='region' label='Region'/>
                <Field field='words' label='Word'/>
                <Field field='titles' label='Title'/>
                <Field field='ancestralWeapons' label='Weapon'/>
            </ItemDetails>
        )

        return(
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}