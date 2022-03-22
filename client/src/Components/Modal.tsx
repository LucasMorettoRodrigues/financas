import styled from "styled-components"
import { Expense } from "./Modals/Expense"
import { Income } from "./Modals/Income"
import { Transfer } from "./Modals/Transfer"
import { Account } from "./Modals/Account"
import { EditAccount } from "./Modals/EditAccount"
import { EditExpense } from "./Modals/EditExpense"
import ReactDom from 'react-dom'
import { EditIncome } from "./Modals/EditIncome"
import { EditTransfer } from "./Modals/EditTransfer"

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
    z-index: 1000;
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
    top: 5%;
    background-color: white;
    border-radius: 10px;
`

type Props = {
    isOpen: boolean
    closeModal: () => void,
    modal: string,
    data?: any
}

export const Modal = ({ isOpen, closeModal, modal, data }: Props) => {

    const portal = document.getElementById("portal") as HTMLElement;

    return ReactDom.createPortal(
        <>
            <Container isOpen={isOpen}>
                <Aux onClick={closeModal}></Aux>
                <InnerContainer>
                    {modal === 'income' && <Income closeModal={closeModal} />}
                    {modal === 'expense' && <Expense closeModal={closeModal} />}
                    {modal === 'transfer' && <Transfer closeModal={closeModal} />}
                    {modal === 'account' && <Account closeModal={closeModal} />}
                    {modal === 'editAccount' && <EditAccount closeModal={closeModal} data={data} />}
                    {modal === 'editExpense' && <EditExpense closeModal={closeModal} data={data} />}
                    {modal === 'editIncome' && <EditIncome closeModal={closeModal} data={data} />}
                    {modal === 'editTransferency' && <EditTransfer closeModal={closeModal} data={data} />}
                </InnerContainer>
            </Container>
        </>,
        portal
    )
}
