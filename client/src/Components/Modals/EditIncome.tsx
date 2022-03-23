import { useState } from "react"
import { categories } from "../../Data/categories"
import { refreshBalance } from "../../Redux/accountsSlice"
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { editPosting } from "../../Redux/postingsSlice"
import { TPosting, TPosting1 } from "../../Types/tposting"
import { dateToString } from "../../Utils/dateFunctions"
import { Error } from "./Error"
import * as S from './styles'

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
            <S.Title>Editar Receita</S.Title>
            {errors.length > 0 && <Error errors={errors} />}
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
                <S.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option></option>
                    {categories.map((item) => item.type === 'Income' && <option>{item.name}</option>)}
                </S.Select>
            </S.InputLabel>
            <S.Button onClick={handleOnClick}>Continuar</S.Button>
        </>
    )
}