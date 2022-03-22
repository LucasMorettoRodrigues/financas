import { useState } from "react"
import styled from "styled-components"
import { refreshBalance } from "../../Redux/accountsSlice"
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { editPosting } from "../../Redux/postingsSlice"
import { TPosting, TPosting1 } from "../../Types/tposting"
import { dateToString } from "../../Utils/dateFunctions"
import { Error } from "./Error"

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
    data: TPosting
}

export const EditIncome = ({ closeModal, data }: Props) => {

    const dispatch = useAppDispatch()
    const accounts = useAppSelector(state => state.accounts.accounts)

    const [description, setDescription] = useState(data.description)
    const [value, setValue] = useState(data.value)
    const [date, setDate] = useState(dateToString(data.date))
    const [accountId, setAccountId] = useState(data.account_id)
    const [category, setCategory] = useState(data.category)
    const [errors, setErrors] = useState<string[]>([])

    const handleOnClick = () => {

        let err = []

        if (description.length < 1) err.push('Forneça a descrição.')
        if (category.length < 1) err.push('Seleciona uma categoria.')
        if (isNaN(value)) err.push('Forneça o valor.')
        if (value === 0) err.push('Valor deve ser maior que 0.')
        if (accountId.length < 1) err.push('Selecione uma conta.')

        setErrors(err)
        if (err.length > 0) return

        const editedPosting: TPosting1 = {
            id: data.id,
            description: description,
            category: category,
            date: date,
            value: value,
            type: data.type,
            account_id: accountId,
            user_id: data.user_id
        }

        dispatch(editPosting(editedPosting))
        dispatch(refreshBalance({ account_id: data.account_id, value: -data.value }))
        dispatch(refreshBalance({ account_id: accountId, value: value }))

        closeModal()
    }

    return (
        <>
            <Title>Editar Receita</Title>
            {errors.length > 0 && <Error errors={errors} />}
            <InputLabel>
                Descrição
                <Input onChange={(e) => setDescription(e.target.value)} value={description} type='text'></Input>
            </InputLabel>
            <InputLabel>
                Valor
                <Input onChange={(e) => setValue(parseFloat(e.target.value))} value={value} min={0} type='number'></Input>
            </InputLabel>
            <InputLabel>
                Data
                <Input onChange={(e) => setDate(e.target.value)} value={date} type='date'></Input>
            </InputLabel>
            <InputLabel>
                Conta
                <Select onChange={(e) => setAccountId(e.target.value)} value={accountId}>
                    <option></option>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </Select>
            </InputLabel>
            <InputLabel>
                Categoria
                <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option></option>
                    <option>aaa</option>
                    <option>bbb</option>
                </Select>
            </InputLabel>
            <Button onClick={handleOnClick}>Continuar</Button>
        </>
    )
}