import styled from 'styled-components'

const Container = styled.div`
    padding: 40px;
    background-color: white;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px #999;
    margin-bottom: 40px;
`
const Title = styled.h3`
    margin-bottom: 40px;
    color: #555;
`
const List = styled.ul``
const ListItem = styled.li`
    display: flex;
    align-items: center;
    padding: 5px;
    box-shadow: 2px 2px 5px #999;
    border-radius: 10px;
    gap: 15px;
    margin-bottom: 10px;
`
const AccountIcon = styled.div`
    margin-left: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: yellow;
    display: flex;
    align-items: center;
    justify-content: center;
`
const AccountName = styled.h4`
    width: 150px;
`
const AccountType = styled.p`
    flex: 1;
    text-align: center;
`
const AccountValue = styled.h3`
    width: 150px;
`

export const AccountsBox = () => {
    return (
        <Container>
            <Title>Minhas Contas</Title>
            <List>
                <ListItem>
                    <AccountIcon>B</AccountIcon>
                    <AccountName>Banco do Brasil</AccountName>
                    <AccountType>conta corrente</AccountType>
                    <AccountValue>$ 10.000,00</AccountValue>
                </ListItem>
                <ListItem>
                    <AccountIcon>I</AccountIcon>
                    <AccountName>Banco Inter</AccountName>
                    <AccountType>conta corrente</AccountType>
                    <AccountValue>$ 20.000,00</AccountValue>
                </ListItem>
            </List>
        </Container>
    )
}