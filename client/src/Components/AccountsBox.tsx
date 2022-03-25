import { useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { TAccount } from '../Types/taccount'
import { Modal } from './Modal'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { deleteAccountById } from '../Redux/accountsSlice'

const Container = styled.div`
    padding: 50px;
    background-color: white;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px #999;
    margin-bottom: 40px;
    background: radial-gradient(white, #D7FFC3);

    @media(max-width: 750px) {
        padding: 10px;
    }
`
const Title = styled.h3`
    margin-bottom: 40px;
    color: #444;
    font-size: 18px;

    @media(max-width: 750px) {
        margin-top: 20px;
        text-align: center;
        margin-bottom: 20px;
    }
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

    @media(max-width: 750px) {
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px;
    }
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
    font-size: 20px;
`
const AccountName = styled.h4`
    width: 150px;
    color: #444;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 1.2px;

    @media(max-width: 750px) {
        flex: 1;
        min-width: 160px;
    }
`
const AccountType = styled.p`
    flex: 1;
    text-align: center;
    color: #888;
    font-style: italic;

    @media(max-width: 750px) {
        display: none;
    }
`
const AccountValue = styled.h3`
    color: #2783E5;
    font-weight: 600;
    font-size: 20px;
    min-width: 100px;

    @media(max-width: 750px) {
        
        flex: 1;
        text-align: center;
    }
`
const Buttons = styled.div`
    margin-right: 20px;
    display: flex;

    @media(max-width: 750px) {
        flex: 1;
        justify-content: center;
    }
`
const Button = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background-color: white;
    cursor: pointer;
    margin-right: 15px;
    color: #888;

    &:hover {
        color: black;
    }
`

export const AccountsBox = () => {

    const dispatch = useAppDispatch()
    const accounts = useAppSelector(state => state.accounts.accounts)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [accountToEdit, setAccountToEdit] = useState<TAccount | null>(null)

    const handleEdit = (account: TAccount) => {
        setAccountToEdit(account)
        setIsModalOpen(true)
    }

    const handleDelete = (account: TAccount) => {
        dispatch(deleteAccountById(account.id))
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
                        <Buttons>
                            <Button onClick={() => handleEdit(item)}><FaRegEdit fontSize='18px' /></Button>
                            <Button onClick={() => handleDelete(item)}><FaRegTrashAlt fontSize='18px' /></Button>
                        </Buttons>
                    </ListItem>
                ))}
            </List>
        </Container>
    )
}