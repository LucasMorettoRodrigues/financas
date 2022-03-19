import styled from "styled-components"

const Title = styled.h4`
    margin-bottom: 20px;
    color: #666;
`
const InputLabel = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    color: #555;
    gap: 5px;
    margin-bottom: 10px;
`
const Input = styled.input`
    width: 100%;
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #999;
    outline-color: lightblue;
`
const Select = styled.select`
    width: 100%;
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #999;
    background-color: white;
    outline-color: lightblue;
`
const Button = styled.button`
    padding: 10px 20px;
    color: white;
    background-color: green;
    font-weight: bold;
    font-size: 15px;
    border-radius: 10px;
    border: none;
    margin-top: 10px;
    width: 100%;
`

export const Account = () => {
    return (
        <>
            <Title>Nova conta</Title>
            <InputLabel>
                Nome da nova conta
                <Input type='text'></Input>
            </InputLabel>
            <InputLabel>
                Tipo da nova conta
                <Input type='text'></Input>
            </InputLabel>
            <InputLabel>
                Saldo Inicial
                <Input type='number'></Input>
            </InputLabel>
            <Button>Continuar</Button>
        </>
    )
}