import React, {Component} from 'react';
import UpdateItem from '../components/updatesItem/updateItem';

export default class Cursor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'Cursor',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque finibus felis, ac condimentum lacus porta vitae. Morbi volutpat hendrerit sapien a finibus.',
            quant: 0,
            price: 13,
            multiplier: 0
        }
    }

    increaseUpgrade = () => {

    }

    buyUpgrade = () => {
        let price = this.state.price,
            newPrice = Math.ceil(price + price*20/100);
        if(this.props.currentBeerDrinked > price) { 
            this.setState({price: newPrice});
            this.returnValue();
        }else{
            console.log('sem cerveja sucifiente');
        }
    }

    returnValue = () => {
        // let obj = {cursor: this.state.price}
        this.props.parentCallback(this.state.price);
    }

    render() {
        return(
            <div onClick={this.buyUpgrade}>
                <UpdateItem name={this.state.name} qnt={this.state.quant} price={this.state.price}/>
            </div>
        )
    }

}