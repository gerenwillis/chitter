import React from 'react';
import styled from 'styled-components';

function Header() {
    const Head = styled.header`
        background-color: #282c34;
        min-height: 25vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
    `
    const Logo = styled.h1`
        text-align: center;
        font-size: calc(10px + 5vmin);;
        color: #61dafb
    `;

    return (
        <Head>
            <Logo>Chitter</Logo>
        </Head>
    )
}

export default Header