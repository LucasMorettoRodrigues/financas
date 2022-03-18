import styled from 'styled-components'

const Container = styled.div`
    padding: 40px;
    background-color: white;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px #999;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`
const Button = styled.button`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: none;
    box-shadow: 2px 2px 5px #999;
    cursor: pointer;
`

export const ActionsBox = () => {
    return (
        <Container>
            <Button>Nova Receita</Button>
            <Button>Nova Despesa</Button>
            <Button>Transferência</Button>
            <Button>Nova Conta</Button>
        </Container>
    )
}
