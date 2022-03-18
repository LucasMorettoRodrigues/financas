import styled from 'styled-components'

const Container = styled.div`
    background-color: lightgreen;
`
const Wrapper = styled.div`
    max-width: 1200px;
    display: flex;
    align-items: center;
    padding: 10px 10px;
    margin: 0 auto;
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

export const AppNavbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>Finanças</Left>
                <Center>
                    <List>
                        <ListItem>Resumo</ListItem>
                        <ListItem>Contas</ListItem>
                        <ListItem>Lançamentos</ListItem>
                        <ListItem>Relatórios</ListItem>
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
