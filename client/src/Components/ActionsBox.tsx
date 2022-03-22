import styled from 'styled-components'
import { BsPlusCircle, BsDashCircle, BsArrowLeftRight, BsPiggyBank } from 'react-icons/bs'
import { useState } from 'react'
import { Modal } from './Modal'

const Container = styled.div`
    padding: 50px;
    background-color: white;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px #999;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    background: radial-gradient(white, #D7FFC3);

    @media(max-width: 750px) {
        padding: 10px;
    }
`
const Button = styled.button`
    margin: 5px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
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

    @media(max-width: 750px) {
        width: 130px;
        height: 130px;
    }
`
const ButtonText = styled.p`
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
    color: #555;

    @media(max-width: 750px) {
        font-size: 14px;
    }
`

export const ActionsBox = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentModal, setCurrentModal] = useState("")

    const handleClick = (modal: string) => {
        setCurrentModal(modal)
        setIsModalOpen(true)
    }

    return (
        <Container>
            <Modal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                modal={currentModal}
            />
            <Button onClick={() => handleClick('income')} color='lightgreen'>
                <BsPlusCircle fontSize='50px' color='#1BB620' />
                <ButtonText>Nova Receita</ButtonText>
            </Button>
            <Button onClick={() => handleClick('expense')} color='#FFA5A5'>
                <BsDashCircle fontSize='50px' color='#FF2D2D' />
                <ButtonText>Nova Despesa</ButtonText>
            </Button>
            <Button onClick={() => handleClick('transfer')} color='lightblue'>
                <BsArrowLeftRight fontSize='50px' color='#2783E5' />
                <ButtonText>Transferência</ButtonText>
            </Button>
            <Button onClick={() => handleClick('account')} color='#FFCF8F'>
                <BsPiggyBank fontSize='50px' color='orange' />
                <ButtonText>Nova Conta</ButtonText>
            </Button>
        </Container>
    )
}
