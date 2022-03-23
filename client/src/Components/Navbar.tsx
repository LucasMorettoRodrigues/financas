import styled from 'styled-components'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 30px 10px;
`
const Left = styled.div`
    font-weight: bold;
    font-size: 50px;
    color: #222;

    @media(max-width: 920px) {
        font-size: 30px;
    }
`
const Center = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    @media(max-width: 920px) {
        display: none;
    }
`
const Right = styled.div`
    @media(max-width: 920px) {
        display: none;
    }
`

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
const ResponsiveMenu = styled.div`
    display: none;

    @media(max-width: 920px) {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: end;
        z-index: 10;
    }
`
const ResponsiveList = styled.div<{ isOpen: boolean }>`
    transition: all .5s ease;
    opacity: ${props => props.isOpen ? 1 : 0};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: lightgreen;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ResponsiveListItem = styled.div`
    width: 100%;
    padding: 10px 0;
    text-align: center;
    font-size: 22px;
    letter-spacing: 1.4px;
    cursor: pointer;
    color: darkgreen;
`
const CloseButton = styled.button`
    position: fixed;
    top: 15px;
    right: 15px;
    background-color: inherit;
    border: none;
`

export const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

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
            <ResponsiveMenu>
                <GiHamburgerMenu onClick={() => setIsOpen(true)} fontSize='24px' color='#222' cursor='pointer' />
                <ResponsiveList isOpen={isOpen}>
                    <CloseButton onClick={() => setIsOpen(false)}><IoCloseOutline fontSize='28px' cursor='pointer' /></CloseButton>
                    <ResponsiveListItem onClick={() => setIsOpen(false)}>Início</ResponsiveListItem>
                    <ResponsiveListItem onClick={() => setIsOpen(false)}>Quem Somos</ResponsiveListItem>
                    <ResponsiveListItem onClick={() => setIsOpen(false)}>Serviços</ResponsiveListItem>
                    <ResponsiveListItem onClick={() => setIsOpen(false)}>Contato</ResponsiveListItem>
                    <ResponsiveListItem onClick={() => setIsOpen(false)}>Login</ResponsiveListItem>
                    <ResponsiveListItem onClick={() => setIsOpen(false)}>Register</ResponsiveListItem>
                </ResponsiveList>
            </ResponsiveMenu>
        </Container>
    )
}
