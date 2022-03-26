import { useState } from "react"
import { categories } from "../../Data/categories"
import { useAppDispatch, useAppSelector } from "../../Redux/hooks"
import { addPosting } from "../../Redux/postingsSlice"
import { TPosting1 } from "../../Types/tposting"
import { dateNow } from "../../Utils/dateFunctions"
import { Error } from "./Error"
import * as S from './styles'

type Props = {
    closeModal: () => void,
}

export const Income = ({ closeModal }: Props) => {

    const dispatch = useAppDispatch()
    const accounts = useAppSelector(state => state.accounts.accounts)

    const [description, setDescription] = useState('')
    const [value, setValue] = useState<string>('0')
    const [date, setDate] = useState(dateNow())
    const [account, setAccount] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [errors, setErrors] = useState<string[]>([])

    const handleOnClick = () => {

        let err = []

        if (description.length < 1) err.push('Forneça a descrição.')
        if (!categoryId) err.push('Selecione uma categoria.')
        if (parseFloat(value) <= 0) err.push('Valor deve ser positivo.')
        if (!value) err.push('Forneça o valor.')
        if (!account) err.push('Selecione uma conta.')

        setErrors(err)
        if (err.length > 0) return

        const newPosting: TPosting1 = {
            id: 5,
            description: description,
            category: 'teste',
            category_id: parseInt(categoryId),
            date: date,
            value: Math.round(parseFloat(value) * 100) / 100,
            type: 'Income',
            account_id: parseInt(account),
            user_id: 1
        }

        dispatch(addPosting(newPosting))
        closeModal()
        clearFields()
    }

    const clearFields = () => {
        setDescription('')
        setValue('0')
        setDate(dateNow())
        setAccount('')
        setCategoryId('')
    }

    return (
        <>
            <S.Title>Nova receita</S.Title>
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
                <S.Select onChange={(e) => setAccount(e.target.value)} value={account}>
                    <option></option>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </S.Select>
            </S.InputLabel>
            <S.InputLabel>
                Categoria
                <S.Select onChange={(e) => setCategoryId(e.target.value)} value={categoryId}>
                    <option></option>
                    {categories.map((item) => item.type === 'Income' && <option value={item.id} key={item.id}>{item.name}</option>)}
                </S.Select>
            </S.InputLabel>
            <S.Button onClick={handleOnClick}>Continuar</S.Button>
        </>
    )
}
