import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

const Container = styled.div`
    background-color: lightgreen;
`
const Wrapper = styled.div`
    max-width: 1200px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    margin: 0 auto;
`
const Left = styled.div`
    font-weight: 600;
    font-size: 30px;
    color: #111;
`
const Center = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8x 0;

    @media(max-width: 750px) {
        display: none;
    }
`
const Right = styled.div`
    min-width: 140px;

    @media(max-width: 750px) {
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
    border-bottom: 4px solid lightgreen;
    cursor: pointer;
    transition: all .5s ease;

    &:hover {
        color: darkgreen;
        border-bottom: 4px solid white;
    }
`
const ResponsiveMenu = styled.div`
    display: none;

    @media(max-width: 750px) {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: end;
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

export const AppNavbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <Container>
            <Wrapper>
                <Left><Link to={'/financas'}>Finanças</Link></Left>
                <Center>
                    <List>
                        <Link to={'/app'}><ListItem>Resumo</ListItem></Link>
                        <Link to={'/app/postings'}><ListItem>Lançamentos</ListItem></Link>
                    </List>
                </Center>
                <Right>
                    <List>
                        <ListItem>Minha Conta</ListItem>
                    </List>
                </Right>
                <ResponsiveMenu>
                    <GiHamburgerMenu onClick={() => setIsOpen(true)} fontSize='24px' color='#222' cursor='pointer' />
                    <ResponsiveList isOpen={isOpen}>
                        <CloseButton onClick={() => setIsOpen(false)}><IoCloseOutline fontSize='28px' cursor='pointer' /></CloseButton>
                        <Link to={'/app'}><ResponsiveListItem onClick={() => setIsOpen(false)}>Resumo</ResponsiveListItem></Link>
                        <Link to={'/app/postings'}><ResponsiveListItem onClick={() => setIsOpen(false)}>Lançamentos</ResponsiveListItem></Link>
                        <ResponsiveListItem onClick={() => setIsOpen(false)}>Minha Conta</ResponsiveListItem>
                    </ResponsiveList>
                </ResponsiveMenu>
            </Wrapper>
        </Container>
    )
}
