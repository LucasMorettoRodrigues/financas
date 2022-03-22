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

export const Income = ({ closeModal }: Props) => {

    const dispatch = useAppDispatch()
    const accounts = useAppSelector(state => state.accounts.accounts)

    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)
    const [date, setDate] = useState(dateNow())
    const [account, setAccount] = useState('')
    const [category, setCategory] = useState('')
    const [errors, setErrors] = useState<string[]>([])

    const handleOnClick = () => {

        let err = []

        if (description.length < 1) err.push('Forneça a descrição.')
        if (category.length < 1) err.push('Seleciona uma categoria.')
        if (value === 0) err.push('Valor deve ser maior que 0.')
        if (isNaN(value)) err.push('Forneça o valor.')
        if (account.length < 1) err.push('Selecione uma conta.')

        setErrors(err)
        if (err.length > 0) return

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
        dispatch(refreshBalance({ account_id: '0001', value: value }))
        closeModal()
        clearFields()
    }

    const clearFields = () => {
        setDescription('')
        setValue(0)
        setDate(dateNow())
        setAccount('')
        setCategory('')
    }

    return (
        <>
            <S.Title>Nova receita</S.Title>
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
                <S.Select onChange={(e) => setAccount(e.target.value)} value={account}>
                    <option></option>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </S.Select>
            </S.InputLabel>
            <S.InputLabel>
                Categoria
                <S.Select onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option></option>
                    <option>aaa</option>
                    <option>bbb</option>
                </S.Select>
            </S.InputLabel>
            <S.Button onClick={handleOnClick}>Continuar</S.Button>
        </>
    )
}
