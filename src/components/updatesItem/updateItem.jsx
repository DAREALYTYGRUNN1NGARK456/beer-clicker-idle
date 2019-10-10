import React, {Component} from 'react';
import './updateItem.scss';

export default class UpdateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qnt: 0    
        }
    }

    render() {
        const {
            name,
            qnt,
            price
        } = this.props;

        return (
            <section className='UpgradeItem'>
                <div>
                    <h1>{name}</h1>
                </div>
                <div className='basicInfo'>
                    <span>{qnt}</span>
                    <span>{price}</span>
                </div>
            </section>
        )
    }

}