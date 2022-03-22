import { useState } from "react"
import styled from "styled-components"
import { editAccount } from "../../Redux/accountsSlice"
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
            <Title>Nova conta</Title>
            {errors.length > 0 && <Error errors={errors} />}
            <InputLabel>
                Nome da conta
                <Input onChange={(e) => setName(e.target.value)} value={name} type='text'></Input>
            </InputLabel>
            <InputLabel>
                Tipo da conta
                <Input onChange={(e) => setType(e.target.value)} value={type} type='text'></Input>
            </InputLabel>
            <InputLabel>
                Saldo
                <Input onChange={(e) => setBalance(parseFloat(e.target.value))} value={balance} min={0} type='number'></Input>
            </InputLabel>
            <Button onClick={handleOnClick}>Continuar</Button>
        </>
    )
}