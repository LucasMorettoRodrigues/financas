import { useState } from "react"
import { refreshBalance } from "../../Redux/accountsSlice"
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { addPosting } from "../../Redux/postingsSlice"
import { TPosting1 } from "../../Types/tposting"
import { dateNow } from "../../Utils/dateFunctions"
import { Error } from "./Error"
import * as S from './styles'

type Props = {
    closeModal: () => void,
}

export const Expense = ({ closeModal }: Props) => {

    const dispatch = useAppDispatch()
    const accounts = useAppSelector(state => state.accounts.accounts)

    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)
    const [date, setDate] = useState(dateNow())
    const [accountId, setAccountId] = useState('')
    const [category, setCategory] = useState('')
    const [errors, setErrors] = useState<string[]>([])

    const handleOnClick = () => {

        let err = []

        if (description.length < 1) err.push('Forneça a descrição.')
        if (category.length < 1) err.push('Seleciona uma categoria.')
        if (isNaN(value)) err.push('Forneça o valor.')
        if (value === 0) err.push('Valor deve ser maior que 0.')
        if (accountId.length < 1) err.push('Selecione uma conta.')
        if (accounts.find(x => x.id === accountId) &&
            accounts.find(x => x.id === accountId)?.balance! < value) err.push('Saldo insuficiente.')

        setErrors(err)
        if (err.length > 0) return

        const newPosting: TPosting1 = {
            id: '0006',
            description: description,
            category: category,
            date: date,
            value: -value,
            type: 'Expense',
            account_id: accountId,
            user_id: '0001'
        }

        dispatch(addPosting(newPosting))
        dispatch(refreshBalance({ account_id: '0001', value: -value }))
        closeModal()
        clearFields()
    }

    const clearFields = () => {
        setDescription('')
        setValue(0)
        setDate(dateNow())
        setAccountId('')
        setCategory('')
    }

    return (
        <>
            <S.Title>Nova despesa</S.Title>
            {errors.length > 0 && <Error errors={errors} />}
            <S.InputLabel>
                Descrição
                <S.Input onChange={(e) => setDescription(e.target.value)} value={description} type='text'></S.Input>
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
                Conta
                <S.Select onChange={(e) => setAccountId(e.target.value)} value={accountId}>
                    <option></option>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </S.Select>
            </S.InputLabel>
            <S.InputLabel>
                Categoria
                <S.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option></option>
                    <option>aaa</option>
                    <option>bbb</option>
                </S.Select>
            </S.InputLabel>
            <S.Button onClick={handleOnClick}>Continuar</S.Button>
        </>
    )
}