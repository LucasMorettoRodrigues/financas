import { useState } from "react"
import { categories } from "../../Data/categories"
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { editPosting } from "../../Redux/postingsSlice"
import { TPosting, TPosting1 } from "../../Types/tposting"
import { dateToString } from "../../Utils/dateFunctions"
import { Error } from "./Error"
import * as S from './styles'

type Props = {
    closeModal: () => void,
    data: TPosting,
}

export const EditExpense = ({ closeModal, data }: Props) => {

    const dispatch = useAppDispatch()
    const accounts = useAppSelector(state => state.accounts.accounts)

    const [description, setDescription] = useState(data.description)
    const [value, setValue] = useState<number | ''>(-data.value)
    const [date, setDate] = useState(dateToString(data.date))
    const [accountId, setAccountId] = useState(data.account_id)
    const [categoryId, setCategoryId] = useState(data.category_id)
    const [errors, setErrors] = useState<string[]>([])

    const handleOnClick = () => {

        let err = []

        if (description.length < 1) err.push('Forneça a descrição.')
        if (!value || value <= 0) err.push('Valor deve ser maior que 0.')
        if (accounts.find(acc => acc.id === accountId)!.balance! - data.value < value) err.push('Saldo insuficiente.')

        setErrors(err)
        if (err.length > 0) return

        const editedPosting: TPosting1 = {
            id: data.id,
            description: description,
            category: '',
            category_id: categoryId,
            date: date,
            value: -value,
            type: data.type,
            account_id: accountId,
            user_id: data.user_id
        }

        dispatch(editPosting(editedPosting))
        closeModal()
    }

    return (
        <>
            <S.Title>Editar Despesa</S.Title>
            {errors.length > 0 && <Error errors={errors} />}
            <S.InputLabel>
                Descrição
                <S.Input maxLength={12} onChange={(e) => setDescription(e.target.value)} value={description} type='text'></S.Input>
            </S.InputLabel>
            <S.InputLabel>
                Valor
                <S.Input onChange={(e) => setValue(e.target.value ? parseFloat(e.target.value) : '')} value={value} min={0} type='number'></S.Input>
            </S.InputLabel>
            <S.InputLabel>
                Data
                <S.Input onChange={(e) => setDate(e.target.value)} value={date} type='date'></S.Input>
            </S.InputLabel>
            <S.InputLabel>
                Conta
                <S.Select onChange={(e) => setAccountId(parseInt(e.target.value))} value={accountId}>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </S.Select>
            </S.InputLabel>
            <S.InputLabel>
                Categoria
                <S.Select onChange={(e) => setCategoryId(parseInt(e.target.value))} value={categoryId} >
                    {categories.map((item) => item.type === 'Expense' && <option value={item.id} key={item.id}>{item.name}</option>)}
                </S.Select>
            </S.InputLabel>
            <S.Button onClick={handleOnClick}>Continuar</S.Button>
        </>
    )
}