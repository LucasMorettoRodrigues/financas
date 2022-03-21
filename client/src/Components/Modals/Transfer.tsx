import { useState } from "react"
import styled from "styled-components"
import { refreshBalance } from "../../Redux/accountsSlice"
import { useAppDispatch, useAppSelector } from "../../Redux/hooks"
import { addPosting } from "../../Redux/postingsSlice"
import { TPosting1 } from "../../Types/tposting"
import { dateNow } from "../../Utils/dateFunctions"
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
}

export const Transfer = ({ closeModal }: Props) => {

    const dispatch = useAppDispatch()
    const accounts = useAppSelector(state => state.accounts.accounts)

    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)
    const [date, setDate] = useState(dateNow())
    const [fromAccount, setFromAccount] = useState('')
    const [toAccount, setToAccount] = useState('')
    const [errors, setErrors] = useState<string[]>([])

    const handleOnClick = () => {

        let err = []

        if (description.length < 1) err.push('Forneça a descrição.')
        if (value === 0) err.push('Valor deve ser maior que 0.')
        if (isNaN(value)) err.push('Forneça o valor.')
        if (toAccount.length < 1) err.push('Selecione a conta de entrada.')
        if (fromAccount.length < 1) err.push('Selecione a conta de saída.')
        if (fromAccount === toAccount && fromAccount.length > 0) err.push('Conta de saída igual a conta de entrada.')

        setErrors(err)

        if (err.length > 0) return

        const newPostingOut: TPosting1 = {
            id: '5',
            description: description,
            category: 'Transf. Saída',
            date: date,
            value: value * (-1),
            type: 'transferency',
            account_id: fromAccount,
            user_id: '0001'
        }

        const newPostingIn: TPosting1 = {
            id: '6',
            description: description,
            category: 'Transf. Entrada',
            date: date,
            value: value,
            type: 'transferency',
            account_id: toAccount,
            user_id: '0001'
        }

        dispatch(addPosting(newPostingOut))
        dispatch(addPosting(newPostingIn))
        dispatch(refreshBalance({ account_id: toAccount, value: value }))
        dispatch(refreshBalance({ account_id: fromAccount, value: -value }))
        closeModal()
        clearFields()
    }

    const clearFields = () => {
        setDescription('')
        setValue(0)
        setDate(dateNow())
        setToAccount('')
        setFromAccount('')
    }

    return (
        <>
            <Title>Nova transferência</Title>
            {errors.length > 0 && <Error errors={errors} />}
            {console.log(value)
            }
            <InputLabel>
                Descrição
                <Input onChange={(e) => setDescription(e.target.value)} type='text'></Input>
            </InputLabel>
            <InputLabel>
                Valor
                <Input onChange={(e) => setValue(parseFloat(e.target.value))} value={value} min={0} type='number'></Input>
            </InputLabel>
            <InputLabel>
                Data
                <Input onChange={(e) => setDate(e.target.value)} value={dateNow()} type='date'></Input>
            </InputLabel>
            <InputLabel>
                Saiu da conta
                <Select onChange={(e) => setFromAccount(e.target.value)}>
                    <option></option>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </Select>
            </InputLabel>
            <InputLabel>
                Entrou na conta
                <Select onChange={(e) => setToAccount(e.target.value)}>
                    <option></option>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </Select>
            </InputLabel>
            <Button onClick={handleOnClick}>Continuar</Button>
        </>
    )
}