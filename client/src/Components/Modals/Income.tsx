import { useState } from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../Redux/hooks"
import { addPosting } from "../../Redux/postingsSlice"
import { TPosting1 } from "../../Types/tposting"
import { dateNow } from "../../Utils/dateFunctions"

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
    cursor: pointer;
`

type Props = {
    closeModal: () => void,
}

export const Income = ({ closeModal }: Props) => {

    const dispatch = useAppDispatch()
    const accounts = useAppSelector(state => state.accounts.accounts)

    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)
    const [date, setDate] = useState('')
    const [account, setAccount] = useState('')
    const [category, setCategory] = useState('')

    const handleOnClick = () => {
        const newPosting: TPosting1 = {
            id: '5',
            description: description,
            category: category,
            date: date,
            value: value,
            type: 'income',
            account_id: account,
            user_id: '0001'
        }

        dispatch(addPosting(newPosting))
        closeModal()
    }

    return (
        <>
            <Title>Nova receita</Title>
            <InputLabel>
                Descrição
                <Input onChange={(e) => setDescription(e.target.value)} type='text'></Input>
            </InputLabel>
            <InputLabel>
                Valor
                <Input onChange={(e) => setValue(parseFloat(e.target.value))} type='number'></Input>
            </InputLabel>
            <InputLabel>
                Data
                <Input onChange={(e) => setDate(e.target.value)} value={dateNow()} type='date'></Input>
            </InputLabel>
            <InputLabel>
                Conta
                <Select onChange={(e) => setAccount(e.target.value)}>
                    <option></option>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </Select>
            </InputLabel>
            <InputLabel>
                Categoria
                <Select onChange={(e) => setCategory(e.target.value)}>
                    <option></option>
                    <option>aaa</option>
                    <option>bbb</option>
                </Select>
            </InputLabel>
            <Button onClick={handleOnClick}>Continuar</Button>
        </>
    )
}
