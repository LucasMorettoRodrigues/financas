import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 30px 10px;
`
const Left = styled.div`
    font-weight: bold;
    font-size: 40px;
    color: #111;
`
const Center = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Right = styled.div``

const List = styled.ul`
    display: flex;
`
const ListItem = styled.li`
    padding: 15px;
    font-weight: 300;
    font-size: 20px;
    z-index: 1;
    border-bottom: 2px solid lightgreen;
    cursor: pointer;
    transition: all .5s ease;

    &:hover {
        color: darkgreen;
        border-bottom: 2px solid darkgreen;
    }
`

export const Navbar = () => {
    return (
        <Container>
            <Left>Finanças</Left>
            <Center>
                <List>
                    <ListItem>Início</ListItem>
                    <ListItem>Quem Somos</ListItem>
                    <ListItem>Serviços</ListItem>
                    <ListItem>Contato</ListItem>
                </List>
            </Center>
            <Right>
                <List>
                    <ListItem>Login</ListItem>
                    <ListItem>Register</ListItem>
                </List>
            </Right>
        </Container>
    )
}
