import styled from "styled-components"

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
    transition: all 1s ease;
`
const Aux = styled.div`
    width: 100vw;
    height: 100vh;
`
const InnerContainer = styled.div`
    position: fixed;
    padding: 40px;
    top: 8%;
    background-color: white;
    width: 500px;
    height: 500px;
    border-radius: 10px;
    z-index: 11;
`

type Props = {
    isOpen: boolean
    closeModal: () => void
}

export const Modal = ({ isOpen, closeModal }: Props) => {
    return (
        <Container isOpen={isOpen}>
            <Aux onClick={closeModal}></Aux>
            <InnerContainer>
                Nova Despesa
            </InnerContainer>
        </Container>
    )
}
