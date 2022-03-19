import styled from "styled-components"
import { Expense } from "./Modals/Expense"
import { Income } from "./Modals/Income"
import { Transfer } from "./Modals/Transfer"
import { Account } from "./Modals/Account"

const Container = styled.div<{ isOpen: boolean }>`
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    transform: translateX(${props => props.isOpen ? 0 : `2000px`});
    position: fixed;
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all .5s ease;
`
const Aux = styled.div`
    width: 100vw;
    height: 100vh;
`
const InnerContainer = styled.div`
    position: fixed;
    padding: 30px 40px;
    width: 500px;
    top: 8%;
    background-color: white;
    border-radius: 10px;
`

type Props = {
    isOpen: boolean
    closeModal: () => void,
    modal: string
}

export const Modal = ({ isOpen, closeModal, modal }: Props) => {
    return (
        <>
            <Container isOpen={isOpen}>
                <Aux onClick={closeModal}></Aux>
                <InnerContainer>
                    {modal === 'income' && <Income />}
                    {modal === 'expense' && <Expense />}
                    {modal === 'transfer' && <Transfer />}
                    {modal === 'account' && <Account />}
                </InnerContainer>
            </Container>
        </>

    )
}
