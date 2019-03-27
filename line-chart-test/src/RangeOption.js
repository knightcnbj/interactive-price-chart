// Let user select range of price (month by default / week / all) then set range in state to it
import './RangeOption.css';
import React, { Component } from 'react';

class RangeOption extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(myRange) {
        this.setState({
            range: myRange,
        });
        alert('you changed the range of price to ' + myRange);
    }

    render() {
        return (
            <div>
                <button onClick={(e) => this.handleClick('month', e)}>Month</button>
                <button onClick={(e) => this.handleClick('week', e)}>Week</button>
                <button onClick={(e) => this.handleClick('all', e)}>All Time</button>
            </div>
            
        );
    }
}

export default RangeOption;