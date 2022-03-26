import { useState } from "react"
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { addPosting } from "../../Redux/postingsSlice"
import { TPosting1 } from "../../Types/tposting"
import { dateNow } from "../../Utils/dateFunctions"
import { Error } from "./Error"
import { categories } from "../../Data/categories"
import * as S from './styles'

type Props = {
    closeModal: () => void,
}

export const Expense = ({ closeModal }: Props) => {

    const dispatch = useAppDispatch()
    const accounts = useAppSelector(state => state.accounts.accounts)

    const [description, setDescription] = useState('')
    const [value, setValue] = useState('0')
    const [date, setDate] = useState(dateNow())
    const [accountId, setAccountId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [errors, setErrors] = useState<string[]>([])

    const handleOnClick = () => {

        let err = []

        if (description.length < 1) err.push('Forneça a descrição.')
        if (!categoryId) err.push('Selecione uma categoria.')
        if (!value) err.push('Forneça o valor.')
        if (parseFloat(value) <= 0) err.push('Valor deve ser maior que 0.')
        if (!accountId) err.push('Selecione uma conta.')
        if (accounts.find(x => x.id === parseInt(accountId)) &&
            accounts.find(x => x.id === parseInt(accountId))!.balance! < parseFloat(value)) err.push('Saldo insuficiente.')

        setErrors(err)
        if (err.length > 0) return

        const newPosting: TPosting1 = {
            id: 1,
            description: description,
            category: "teste",
            category_id: parseInt(categoryId),
            date: date,
            value: -Math.round(parseFloat(value) * 100) / 100,
            type: 'Expense',
            user_id: 1,
            account_id: parseInt(accountId),
        }

        dispatch(addPosting(newPosting))
        closeModal()
        clearFields()
    }

    const clearFields = () => {
        setDescription('')
        setValue('')
        setDate(dateNow())
        setAccountId('')
        setCategoryId('')
    }

    return (
        <>
            <S.Title>Nova despesa</S.Title>
            {errors.length > 0 && <Error errors={errors} />}
            <S.InputLabel>
                Descrição
                <S.Input maxLength={17} onChange={(e) => setDescription(e.target.value)} value={description} type='text'></S.Input>
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
                Conta
                <S.Select onChange={(e) => setAccountId(e.target.value)} value={accountId}>
                    <option></option>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </S.Select>
            </S.InputLabel>
            <S.InputLabel>
                Categoria
                <S.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option></option>
                    {categories.map((item) => item.type === 'Expense' && <option value={item.id} key={item.id}>{item.name}</option>)}
                </S.Select>
            </S.InputLabel>
            <S.Button onClick={handleOnClick}>Continuar</S.Button>
        </>
    )
}