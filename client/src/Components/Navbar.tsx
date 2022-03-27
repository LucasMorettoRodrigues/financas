import styled from 'styled-components'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

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
        flex: 1;
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
    z-index: 10;
    
    @media(max-width: 920px) {
        display: none;
    }
`

const List = styled.ul`
    display: flex;
    z-index: 10;
`
const ListItem = styled.li`
    padding: 15px;
    font-weight: 300;
    font-size: 20px;
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
        display: flex;
        align-items: center;
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
                    <Link to={'/constructing'}><ListItem>Início</ListItem></Link>
                    <Link to={'/constructing'}><ListItem>Quem Somos</ListItem></Link>
                    <Link to={'/constructing'}><ListItem>Serviços</ListItem></Link>
                    <Link to={'/constructing'}><ListItem>Contato</ListItem></Link>
                </List>
            </Center>
            <Right>
                <List>
                    <ListItem><Link to={'/constructing'}>Login</Link></ListItem>
                    <Link to={'/constructing'}><ListItem>Register</ListItem></Link>
                </List>
            </Right>
            <ResponsiveMenu>
                <GiHamburgerMenu onClick={() => setIsOpen(true)} fontSize='24px' color='#222' cursor='pointer' />
                <ResponsiveList isOpen={isOpen}>
                    <CloseButton onClick={() => setIsOpen(false)}><IoCloseOutline fontSize='28px' cursor='pointer' /></CloseButton>
                    <Link to={'/constructing'}><ResponsiveListItem onClick={() => setIsOpen(false)}>Início</ResponsiveListItem></Link>
                    <Link to={'/constructing'}><ResponsiveListItem onClick={() => setIsOpen(false)}>Quem Somos</ResponsiveListItem></Link>
                    <Link to={'/constructing'}><ResponsiveListItem onClick={() => setIsOpen(false)}>Serviços</ResponsiveListItem></Link>
                    <Link to={'/constructing'}><ResponsiveListItem onClick={() => setIsOpen(false)}>Contato</ResponsiveListItem></Link>
                    <Link to={'/constructing'}><ResponsiveListItem onClick={() => setIsOpen(false)}>Login</ResponsiveListItem></Link>
                    <Link to={'/constructing'}><ResponsiveListItem onClick={() => setIsOpen(false)}>Register</ResponsiveListItem></Link>
                </ResponsiveList>
            </ResponsiveMenu>
        </Container>
    )
}
