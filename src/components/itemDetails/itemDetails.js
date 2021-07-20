import React, {Component} from 'react';
import './itemDetails.css';

const Field = ({currentItem, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{currentItem[field]}</span>
        </li>
    )
}

export {Field}

export default class ItemDetails extends Component {

    state = {
        currentItem: null
    }

    componentDidMount(){
        this.updateItem();
    }

    componentDidUpdate(prevProps){
        if(this.props.itemId !== prevProps.itemId){
            this.updateItem();
        }
    }

    updateItem (){
        const {itemId} = this.props;
        const {gotData} = this.props;
        if(!itemId){
            return;
        } 

        gotData(itemId)
        .then((currentItem) => {
            this.setState({currentItem});
        })
    }

    render() {
        const {pageItem} = this.props;
        if(!this.state.currentItem){
            return <span className='select-error'>Please select a {pageItem}.</span>
        }
        const {currentItem} = this.state; 
        const {name} = this.state.currentItem;
        return (
            <div className="item-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                   {
                       React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {currentItem})
                       })
                   }
                </ul>
            </div>
        );
    }
}