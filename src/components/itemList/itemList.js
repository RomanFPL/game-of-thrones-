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
            return (
                <li 
                key = {item.id}
                onClick={() => this.props.onCharSelected(item.id)}
                className="list-group-item">
                    {item.name}
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