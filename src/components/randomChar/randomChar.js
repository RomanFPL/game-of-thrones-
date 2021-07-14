import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {
    
    constructor(){
        super();
        this.updateChar();
    }


    gotService = new gotService();
    state={
        char : {},
        loading: true,
        error: false
    }

    onCharLoader = (char) => {
        this.setState({
            char,
            loading : false
        })
    }

    onError = (err) => {
        this.setState({
            loading: false, 
            error: true
        })
    }

    updateChar(){
        const id = Math.floor(Math.random()*120+30);
        this.gotService.getCharacter(id)
        .then(this.onCharLoader)
        .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null; 
        const content = !(loading || error) ? <Viev char={char}/> : null;
        return (
            <div className="random-block rounded">
                {errorMessage}
                {content}
            </div>
        );
    }
}

const Viev = ({char}) => {
    const {name,gender,born,died,culture} = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
        </>
    )
}