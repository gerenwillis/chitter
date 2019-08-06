import React, {Component} from 'react';
import styled from 'styled-components';

class ChitterFeed extends Component{
    constructor() {
        super();
        this.state = {
            chitters: []
        }
    }

    getData(url = '') {
        return fetch(url)
            .then(response => response.json())
            .catch(console.log('GET request failed'));
    }

    async componentDidMount() {
        const chitters = await this.getData('/chits');
        this.setState({chitters})
    }

    SectionWrapper = styled.div`
        background-color: #282c34;
        width: 70%;
        margin: auto;
        padding: 1em 0;
    `;

    ChitWrapper = styled.section`
        background-color: papayawhip;
        padding: 0 4em;
        width: 50%;
        margin: auto;
    `;

    ChitName = styled.h3`
        margin: 1em;
        color: #4892a7;
        text-align: center;
        font-size: 2.5rem;
    `;

    ChitMessage = styled.article`
        padding: 1em;
        border: .5em solid #e8dabc;
    `;

    ChitPubDate = styled.time`
        font-size: 1rem;
        color: #757575;
        margin: auto;
        text-align: center;
    `;

    render() {
        return (
            <this.SectionWrapper>
                {this.state.chitters.reverse().map(chitter => {
                    return (
                        <this.ChitWrapper key={chitter._id}>
                            <this.ChitName>{chitter.name}</this.ChitName>
                            <this.ChitMessage>{chitter.content}</this.ChitMessage>
                            <this.ChitPubDate>{Date(chitter.created).toLocaleString()}</this.ChitPubDate>
                        </this.ChitWrapper>
                    )
                })}
            </this.SectionWrapper>

        )
    }
}

export default ChitterFeed