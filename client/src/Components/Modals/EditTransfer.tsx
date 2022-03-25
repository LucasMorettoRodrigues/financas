import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../Redux/hooks"
import { editPosting } from "../../Redux/postingsSlice"
import { TPosting, TPosting1 } from "../../Types/tposting"
import { dateToString } from "../../Utils/dateFunctions"
import { Error } from "./Error"
import * as S from './styles'

type Props = {
    closeModal: () => void,
    data: TPosting,
}

export const EditTransfer = ({ closeModal, data }: Props) => {

    const dispatch = useAppDispatch()
    const accounts = useAppSelector(state => state.accounts.accounts)
    const [description, setDescription] = useState(data.description)
    const [value, setValue] = useState<string>(Math.abs(data.value).toString())
    const [date, setDate] = useState(dateToString(data.date))
    const [accountId, setAccountId] = useState(data.account_id)
    const [errors, setErrors] = useState<string[]>([])

    const handleOnClick = () => {

        let err = []

        if (description.length < 1) err.push('Forneça a descrição.')
        if (parseFloat(value) <= 0) err.push('Valor deve ser maior que 0.')
        if (!value) err.push('Forneça o valor.')
        if (!accountId) err.push('Selecione a conta.')
        if (data.category === 'Transf. Saída' &&
            accounts.find(acc => acc.id === accountId)!.balance - data.value < parseFloat(value)) err.push('Saldo insuficiente.')

        setErrors(err)
        if (err.length > 0) return

        const editedPosting: TPosting1 = {
            id: data.id,
            description: description,
            category: data.category,
            date: date,
            value: data.category === 'Transf. Saída' ? -parseFloat(value) : parseFloat(value),
            type: data.type,
            account_id: accountId,
            user_id: data.user_id,
        }

        dispatch(editPosting(editedPosting))
        closeModal()
    }

    return (
        <>
            <S.Title>Editar transferência</S.Title>
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
                {data.category === 'Transf. Saída' ? 'Saiu da conta' : 'Entrou na conta'}
                <S.Select onChange={(e) => setAccountId(parseInt(e.target.value))} value={accountId}>
                    {accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </S.Select>
            </S.InputLabel>
            <S.Button onClick={handleOnClick}>Continuar</S.Button>
        </>
    )
}