import { useState } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../Redux/hooks'
import { TAccount } from '../Types/taccount'
import { Modal } from './Modal'

const Container = styled.div`
    padding: 40px;
    background-color: white;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px #999;
    margin-bottom: 40px;
    background: radial-gradient(white, #D7FFC3);
`
const Title = styled.h3`
    margin-bottom: 40px;
    color: #111;
    letter-spacing: 2px;
    font-size: 16px;
    font-style: italic;
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
    background-color: white;
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
    color: #444;
    font-weight: 500;
    font-size: 16px;
`
const AccountName = styled.h4`
    width: 150px;
    color: #222;
    font-weight: 600;
    letter-spacing: 2px;
`
const AccountType = styled.p`
    flex: 1;
    text-align: center;
    color: #666;
    font-style: italic;
    letter-spacing: 2px;
`
const AccountValue = styled.h3`
    width: 150px;
    color: #2783E5;
    font-weight: 500;
    letter-spacing: 0px;
`
const Button = styled.button``

export const AccountsBox = () => {

    const accounts = useAppSelector(state => state.accounts.accounts)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [accountToEdit, setAccountToEdit] = useState<TAccount | null>(null)

    const handleOnClick = (account: TAccount) => {
        setAccountToEdit(account)
        setIsModalOpen(true)
    }

    return (
        <Container>
            <Title>Minhas Contas</Title>
            <List>
                {accounts.map(item => (
                    <ListItem key={item.id}>
                        <Modal
                            isOpen={accountToEdit === item ? isModalOpen : false}
                            closeModal={() => setIsModalOpen(false)}
                            modal='editAccount'
                            data={item}
                        />
                        <AccountIcon>{item.name[0]}</AccountIcon>
                        <AccountName>{item.name}</AccountName>
                        <AccountType>{item.type}</AccountType>
                        <AccountValue>$ {item.balance}</AccountValue>
                        <Button onClick={() => handleOnClick(item)}>Edit</Button>
                    </ListItem>
                ))}
            </List>
        </Container>
    )
}