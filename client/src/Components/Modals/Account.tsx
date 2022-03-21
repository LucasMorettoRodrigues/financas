import { useState } from "react"
import styled from "styled-components"
import { addAccount } from "../../Redux/accountsSlice"
import { useAppDispatch } from "../../Redux/hooks"
import { TAccount } from "../../Types/taccount"
import { Error } from "./Error"

const Title = styled.h4`
    margin-bottom: 20px;
    color: #666;
`
const InputLabel = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    color: #555;
    gap: 5px;
    margin-bottom: 10px;
`
const Input = styled.input`
    width: 100%;
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #999;
    outline-color: lightblue;
`
const Button = styled.button`
    padding: 10px 20px;
    color: white;
    background-color: green;
    font-weight: bold;
    font-size: 15px;
    border-radius: 10px;
    border: none;
    margin-top: 10px;
    width: 100%;
    cursor: pointer;
`

type Props = {
    closeModal: () => void,
}

export const Account = ({ closeModal }: Props) => {

    const dispatch = useAppDispatch()

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [initialBalance, setInitialBalance] = useState(0)
    const [errors, setErrors] = useState<string[]>([])

    const handleOnClick = () => {

        let err = []

        if (name.length < 1) err.push('Forneça o nome da conta.')
        if (type.length < 1) err.push('Forneça o tipo da conta.')
        if (isNaN(initialBalance)) err.push('Forneça o valor.')

        setErrors(err)

        if (errors) return

        const newAccount: TAccount = {
            id: '0005',
            name: name,
            type: type,
            balance: initialBalance,
            user_id: '0001'
        }

        dispatch(addAccount(newAccount))
        closeModal()
        clearFields()
    }

    const clearFields = () => {
        setName('')
        setType('')
        setInitialBalance(0)
        setErrors([])
    }

    return (
        <>
            <Title>Nova conta</Title>
            {errors.length > 0 && <Error errors={errors} />}
            <InputLabel>
                Nome da nova conta
                <Input onChange={(e) => setName(e.target.value)} type='text'></Input>
            </InputLabel>
            <InputLabel>
                Tipo da nova conta
                <Input onChange={(e) => setType(e.target.value)} type='text'></Input>
            </InputLabel>
            <InputLabel>
                Saldo Initial
                <Input onChange={(e) => setInitialBalance(parseFloat(e.target.value))} value={initialBalance} min={0} type='number'></Input>
            </InputLabel>
            <Button onClick={handleOnClick}>Continuar</Button>
        </>
    )
}