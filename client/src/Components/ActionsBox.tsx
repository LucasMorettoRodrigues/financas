import styled from 'styled-components'
import { BsPlusCircle, BsDashCircle, BsArrowLeftRight, BsPiggyBank } from 'react-icons/bs'
import { useState } from 'react'
import { Modal } from './Modal'

const Container = styled.div`
    padding: 40px 80px;
    background-color: white;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px #999;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Button = styled.button`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F8F8F8;
    border: none;
    box-shadow: 2px 2px 5px #888;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all .5s ease;

    &:hover {
        background-color: ${props => props.color};
    }
`
const ButtonText = styled.p`
    font-size: 14px;
    font-weight: bold;
    margin-top: 14px;
`

export const ActionsBox = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleClick = (action: string) => {
        if (action === "income") {
            setIsModalOpen(true)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <Container>
            <Modal isOpen={isModalOpen} closeModal={closeModal} />
            <Button onClick={() => handleClick('income')} color='lightgreen'>
                <BsPlusCircle fontSize='50px' color='green' />
                <ButtonText>Nova Receita</ButtonText>
            </Button>
            <Button onClick={() => handleClick('income')} color='#FF8F8F'>
                <BsDashCircle fontSize='50px' color='red' />
                <ButtonText>Nova Despesa</ButtonText>
            </Button>
            <Button onClick={() => handleClick('income')} color='lightblue'>
                <BsArrowLeftRight fontSize='50px' color='blue' />
                <ButtonText>Transferência</ButtonText>
            </Button>
            <Button onClick={() => handleClick('income')} color='#FFCF8F'>
                <BsPiggyBank fontSize='50px' color='orange' />
                <ButtonText>Nova Conta</ButtonText>
            </Button>
        </Container>
    )
}
