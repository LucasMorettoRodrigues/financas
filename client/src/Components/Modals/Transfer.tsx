import { useState } from "react"
import { refreshBalance } from "../../Redux/accountsSlice"
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
        if (accounts.find(x => x.id === fromAccount) &&
            accounts.find(x => x.id === fromAccount)?.balance! < value) err.push('Saldo insuficiente.')

        setErrors(err)
        if (err.length > 0) return

        const newPostingOut: TPosting1 = {
            id: '0006',
            description: description,
            category: 'Transf. Saída',
            date: date,
            value: -value,
            type: 'Transferency',
            account_id: toAccount,
            user_id: '0001',
            from_account_id: fromAccount
        }

        const newPostingIn: TPosting1 = {
            id: '0006',
            description: description,
            category: 'Transf. Entrada',
            date: date,
            value: value,
            type: 'Transferency',
            account_id: toAccount,
            user_id: '0001',
            from_account_id: fromAccount
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
            <S.Title>Nova transferência</S.Title>
            {errors.length > 0 && <Error errors={errors} />}
            {console.log(value)
            }
            <S.InputLabel>
                Descrição
                <S.Input maxLength={12} onChange={(e) => setDescription(e.target.value)} value={description} type='text'></S.Input>
            </S.InputLabel>
            <S.InputLabel>
                Valor
                <S.Input onChange={(e) => setValue(parseFloat(e.target.value))} value={value} min={0} type='number'></S.Input>
            </S.InputLabel>
            <S.InputLabel>
                Data
                <S.Input onChange={(e) => setDate(e.target.value)} value={dateNow()} type='date'></S.Input>
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