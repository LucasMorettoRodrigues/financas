import React from 'react'
import styled from 'styled-components'
import { Header } from '../Components/Header'
import { Navbar } from '../Components/Navbar'

const Container = styled.div`
    background: lightgreen;
`
const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`

export const Home = () => {
    return (
        <Container>
            <Wrapper>
                <Navbar />
                <Header />
            </Wrapper>
        </Container>
    )
}
