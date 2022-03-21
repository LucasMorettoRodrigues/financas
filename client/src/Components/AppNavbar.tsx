import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    background-color: lightgreen;
`
const Wrapper = styled.div`
    max-width: 1200px;
    display: flex;
    align-items: center;
    padding: 0 10px;
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
    border-bottom: 4px solid lightgreen;
    cursor: pointer;
    transition: all .5s ease;

    &:hover {
        color: darkgreen;
        border-bottom: 4px solid white;
    }
`

export const AppNavbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left><Link to={'/'}>Finanças</Link></Left>
                <Center>
                    <List>
                        <Link to={'/app'}><ListItem>Resumo</ListItem></Link>
                        <Link to={'/app/accounts'}><ListItem>Contas</ListItem></Link>
                        <Link to={'/app/postings'}><ListItem>Lançamentos</ListItem></Link>
                    </List>
                </Center>
                <Right>
                    <List>
                        <ListItem>Minha Conta</ListItem>
                    </List>
                </Right>
            </Wrapper>
        </Container>
    )
}
