import { useState } from "react"
import styled from "styled-components"
import { refreshBalance } from "../../Redux/accountsSlice"
import { useAppDispatch, useAppSelector } from "../../Redux/hooks"
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

export const EditTransfer = ({ closeModal, data }: Props) => {

    const dispatch = useAppDispatch()
    const accounts = useAppSelector(state => state.accounts.accounts)

    const [description, setDescription] = useState(data.description)
    const [value, setValue] = useState(Math.abs(data.value))
    const [date, setDate] = useState(dateToString(data.date))
    const [fromAccount, setFromAccount] = useState(data.from_account_id!)
    const [toAccount, setToAccount] = useState(data.account_id)
    const [errors, setErrors] = useState<string[]>([])

    const handleOnClick = () => {

        let err = []

        if (description.length < 1) err.push('Forneça a descrição.')
        if (value === 0) err.push('Valor deve ser maior que 0.')
        if (isNaN(value)) err.push('Forneça o valor.')
        if (toAccount.length < 1) err.push('Selecione a conta de entrada.')
        if (fromAccount!.length < 1) err.push('Selecione a conta de saída.')
        if (fromAccount === toAccount && fromAccount.length > 0) err.push('Conta de saída igual a conta de entrada.')
        if (accounts.find(x => x.id === fromAccount) &&
            accounts.find(x => x.id === fromAccount)?.balance! < value) err.push('Saldo insuficiente.')

        setErrors(err)
        if (err.length > 0) return

        const editedPostingOut: TPosting1 = {
            id: data.id,
            description: description,
            category: 'Transf. Saída',
            date: date,
            value: -value,
            type: data.type,
            account_id: toAccount,
            user_id: data.user_id,
            from_account_id: fromAccount
        }

        const editedPostingIn: TPosting1 = {
            id: data.id,
            description: description,
            category: 'Transf. Entrada',
            date: date,
            value: value,
            type: data.type,
            account_id: toAccount,
            user_id: data.user_id,
            from_account_id: fromAccount
        }

        dispatch(editPosting(editedPostingOut))
        dispatch(editPosting(editedPostingIn))
        dispatch(refreshBalance({ account_id: data.account_id, value: -Math.abs(data.value) }))
        dispatch(refreshBalance({ account_id: toAccount, value: value }))
        dispatch(refreshBalance({ account_id: data.from_account_id, value: Math.abs(data.value) }))
        dispatch(refreshBalance({ account_id: fromAccount, value: -value }))
        closeModal()
    }

    return (
        <>
            <Title>Editar transferência</Title>
            {errors.length > 0 && <Error errors={errors} />}
            {console.log(value)
            }
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
                Saiu da conta
                <Select onChange={(e) => setFromAccount(e.target.value)} value={fromAccount}>
                    <option></option>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </Select>
            </InputLabel>
            <InputLabel>
                Entrou na conta
                <Select onChange={(e) => setToAccount(e.target.value)} value={toAccount}>
                    <option></option>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </Select>
            </InputLabel>
            <Button onClick={handleOnClick}>Continuar</Button>
        </>
    )
}