import styled from 'styled-components'
import { TAccount } from '../Types/taccount'
import { TPosting } from '../Types/tposting'

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
    color: #444;
`
const AccountType = styled.p`
    flex: 1;
    text-align: center;
    color: #666;
    font-style: italic;
`
const AccountValue = styled.h3`
    width: 150px;
    color: blue;
`

type Props = {
    accounts: TAccount[]
}

export const AccountsBox = ({ accounts }: Props) => {
    return (
        <Container>
            <Title>Minhas Contas</Title>
            <List>
                {accounts.map(item => (
                    <ListItem key={item.id}>
                        <AccountIcon>{item.name[0]}</AccountIcon>
                        <AccountName>{item.name}</AccountName>
                        <AccountType>{item.type}</AccountType>
                        <AccountValue>$ {item.balance}</AccountValue>
                    </ListItem>
                ))}
            </List>
        </Container>
    )
}