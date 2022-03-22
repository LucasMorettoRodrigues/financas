import { useState } from "react"
import { editAccount } from "../../Redux/accountsSlice"
import { useAppDispatch } from "../../Redux/hooks"
import { TAccount } from "../../Types/taccount"
import { Error } from "./Error"
import * as S from './styles'

type Props = {
    closeModal: () => void
    data: any
}

export const EditAccount = ({ closeModal, data }: Props) => {

    const dispatch = useAppDispatch()

    const [name, setName] = useState(data.name)
    const [type, setType] = useState(data.type)
    const [balance, setBalance] = useState(data.balance)
    const [errors, setErrors] = useState<string[]>([])

    const handleOnClick = () => {

        let err = []

        if (name.length < 1) err.push('Forneça o nome da conta.')
        if (type.length < 1) err.push('Forneça o tipo da conta.')
        if (isNaN(balance)) err.push('Forneça o valor.')

        setErrors(err)
        if (err.length > 0) return

        const newAccount: TAccount = {
            id: data.id,
            name: name,
            type: type,
            balance: balance,
            user_id: data.user_id
        }

        dispatch(editAccount(newAccount))
        closeModal()
    }

    return (
        <>
            <S.Title>Nova conta</S.Title>
            {errors.length > 0 && <Error errors={errors} />}
            <S.InputLabel>
                Nome da conta
                <S.Input onChange={(e) => setName(e.target.value)} value={name} type='text'></S.Input>
            </S.InputLabel>
            <S.InputLabel>
                Tipo da conta
                <S.Input onChange={(e) => setType(e.target.value)} value={type} type='text'></S.Input>
            </S.InputLabel>
            <S.InputLabel>
                Saldo
                <S.Input onChange={(e) => setBalance(parseFloat(e.target.value))} value={balance} min={0} type='number'></S.Input>
            </S.InputLabel>
            <S.Button onClick={handleOnClick}>Continuar</S.Button>
        </>
    )
}