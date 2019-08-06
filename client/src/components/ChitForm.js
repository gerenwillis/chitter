import React from 'react';
import styled from 'styled-components';

class ChitForm extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            chit: '',
            chitLength: 0
        };
        this.formObj = document.querySelector('.chitForm');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postData = this.postData.bind(this);
    }

    handleChange(event) {
        const {value, name} = event.target;
        this.setState({[name]: value});
        name === 'chit' && this.setState({'chitLength': value.length});
    }

    handleSubmit = async event => {
        event.preventDefault();
        await this.postData('/chits', {name: this.state.name, content: this.state.chit});
        this.setState({
            name: '',
            chit: '',
            chitLength: 0
        })
    }

    postData(url = '', data = {}) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .catch(console.log(data)); // parses JSON response into native JavaScript objects 
    }

    Form = styled.form`
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1em;
        width: 50%;
        text-align: center;
    `;

    Input = styled.input`
        margin: 1em;
        width: 15em;
        display: block;
        text-align: left;
    `;

    TextArea = styled.textarea`
        display: block;
        margin: 1em 0;
        text-align: left;
    `;

    render() {
        return (
            <this.Form onSubmit={this.handleSubmit} className='chitForm'>
                <label>
                Name:
                <this.Input type="text" name='name' value={this.state.name} onChange={this.handleChange} />
                </label>
                <label>
                What do you want to say?
                <this.TextArea 
                    name='chit' 
                    value={this.state.chit} 
                    onChange={this.handleChange} 
                    maxLength={140} 
                    rows={25}
                    cols={25}
                    />
                <span>{this.state.chitLength}/140 characters</span>
                </label>
                <this.Input type="submit" value="Submit" />
            </this.Form>
        )
    }
}


export default ChitForm