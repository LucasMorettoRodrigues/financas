import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../Redux/hooks"
import { addPosting } from "../../Redux/postingsSlice"
import { TPosting1 } from "../../Types/tposting"
import { dateNow } from "../../Utils/dateFunctions"
import { Error } from "./Error"
import * as S from './styles'

type Props = {
    closeModal: () => void,
}

export const Transfer = ({ closeModal }: Props) => {

    const dispatch = useAppDispatch()
    const accounts = useAppSelector(state => state.accounts.accounts)

    const [description, setDescription] = useState('')
    const [value, setValue] = useState('0')
    const [date, setDate] = useState(dateNow())
    const [fromAccount, setFromAccount] = useState('')
    const [toAccount, setToAccount] = useState('')
    const [errors, setErrors] = useState<string[]>([])

    const handleOnClick = () => {

        let err = []

        if (description.length < 1) err.push('Forneça a descrição.')
        if (parseFloat(value) <= 0) err.push('Valor deve ser maior que 0.')
        if (!value) err.push('Forneça o valor.')
        if (!toAccount) err.push('Selecione a conta de entrada.')
        if (!fromAccount) err.push('Selecione a conta de saída.')
        if (fromAccount === toAccount && fromAccount) err.push('Conta de saída igual a conta de entrada.')
        if (accounts.find(x => x.id === parseInt(fromAccount)) &&
            accounts.find(x => x.id === parseInt(fromAccount))!.balance! < parseFloat(value)) err.push('Saldo insuficiente.')

        setErrors(err)
        if (err.length > 0) return

        const newPostingOut: TPosting1 = {
            id: 6,
            description: description,
            category: 'Transf. Saída',
            category_id: 14,
            date: date,
            value: -parseFloat(value),
            type: 'Transferency',
            account_id: parseInt(fromAccount),
            user_id: 1,
        }

        const newPostingIn: TPosting1 = {
            id: 6,
            description: description,
            category: 'Transf. Entrada',
            category_id: 15,
            date: date,
            value: parseFloat(value),
            type: 'Transferency',
            account_id: parseInt(toAccount),
            user_id: 1,
        }

        dispatch(addPosting(newPostingOut))
        dispatch(addPosting(newPostingIn))
        closeModal()
        clearFields()
    }

    const clearFields = () => {
        setDescription('')
        setValue('0')
        setDate(dateNow())
        setToAccount('')
        setFromAccount('')
    }

    return (
        <>
            <S.Title>Nova transferência</S.Title>
            {errors.length > 0 && <Error errors={errors} />}
            <S.InputLabel>
                Descrição
                <S.Input maxLength={12} onChange={(e) => setDescription(e.target.value)} value={description} type='text'></S.Input>
            </S.InputLabel>
            <S.InputLabel>
                Valor
                <S.Input onChange={(e) => setValue(e.target.value)} value={value} min={0} type='number'></S.Input>
            </S.InputLabel>
            <S.InputLabel>
                Data
                <S.Input onChange={(e) => setDate(e.target.value)} value={date} type='date'></S.Input>
            </S.InputLabel>
            <S.InputLabel>
                Saiu da conta
                <S.Select onChange={(e) => setFromAccount(e.target.value)} value={fromAccount}>
                    <option></option>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </S.Select>
            </S.InputLabel>
            <S.InputLabel>
                Entrou na conta
                <S.Select onChange={(e) => setToAccount(e.target.value)} value={toAccount}>
                    <option></option>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </S.Select>
            </S.InputLabel>
            <S.Button onClick={handleOnClick}>Continuar</S.Button>
        </>
    )
}