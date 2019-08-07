import React, {Component} from 'react';
import ChitForm from './components/ChitForm';
import ChitterFeed from './components/ChitterFeed';

class Chitter extends Component {
    constructor() {
        super();
        this.state = {
            chitters: []
        };
        this.getData = this.getData.bind(this);
        this.updateStateFromDB = this.updateStateFromDB.bind(this);
    }

    getData(url = '') {
        return fetch(url)
            .then(response => response.json())
            .catch(err => console.error(err));
    }

    async updateStateFromDB() {
        const chitters = await this.getData('/chits');
        this.setState({chitters});
    }

    async componentWillMount() {
        await this.updateStateFromDB();        
    }
    

    render() {
        return (
            <div /*onSubmit={this.getData('/chits')}*/>
                <ChitForm getData={this.updateStateFromDB}/>
                <ChitterFeed chitters={this.state.chitters}/>
            </div>
        )
    }
}

export default Chitter