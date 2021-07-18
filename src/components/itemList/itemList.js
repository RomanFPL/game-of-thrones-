import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
export default class ItemList extends Component {

    state = {
        itemList: null
    }

    componentDidMount(){
        const {gotData} = this.props;
        gotData() 
            .then( (itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    renderItems = (arr) => {
        return arr.map((item, i) => {
            
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li 
                key = {id}
                onClick={() => this.props.onCharSelected(id)}
                className="list-group-item">
                    {label}
                </li>
            )
        })
    }
    render() {
        const {itemList} = this.state;
        
        if(!itemList){
            return <Spinner/>
        }

        const items = this.renderItems(itemList);
        
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}