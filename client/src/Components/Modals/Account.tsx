import { useState } from "react"
import { addAccount, getAccounts } from "../../Redux/accountsSlice"
import { useAppDispatch } from "../../Redux/hooks"
import { TAccount } from "../../Types/taccount"
import { Error } from "./Error"
import * as S from './styles'

type Props = {
    closeModal: () => void
}

export const Account = ({ closeModal }: Props) => {

    const dispatch = useAppDispatch()

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [initialBalance, setInitialBalance] = useState('0')
    const [errors, setErrors] = useState<string[]>([])

    const handleOnClick = () => {

        let err = []

        if (name.length < 1) err.push('Forneça o nome da conta.')
        if (type.length < 1) err.push('Forneça o tipo da conta.')
        if (!initialBalance) err.push('Forneça o valor.')
        if (parseFloat(initialBalance) < 0) err.push('Saldo deve ser positivo.')

        setErrors(err)
        if (err.length > 0) return

        const newAccount: TAccount = {
            id: 5,
            name: name,
            type: type,
            balance: Math.round(parseFloat(initialBalance!) * 100) / 100,
            user_id: 1
        }

        dispatch(addAccount(newAccount))
        dispatch(getAccounts())
        clearFields()
        closeModal()
    }

    const clearFields = () => {
        setName('')
        setType('')
        setInitialBalance('0')
    }

    return (
        <>
            <S.Title>Nova conta</S.Title>
            {errors.length > 0 && <Error errors={errors} />}
            <S.InputLabel>
                Nome da nova conta
                <S.Input maxLength={15} onChange={(e) => setName(e.target.value)} value={name} type='text'></S.Input>
            </S.InputLabel>
            <S.InputLabel>
                Tipo da nova conta
                <S.Input maxLength={15} onChange={(e) => setType(e.target.value)} value={type} type='text'></S.Input>
            </S.InputLabel>
            <S.InputLabel>
                Saldo Initial
                <S.Input onChange={(e) => setInitialBalance(e.target.value)} value={initialBalance} min={0} type='number'></S.Input>
            </S.InputLabel>
            <S.Button onClick={handleOnClick}>Continuar</S.Button>
        </>
    )
}