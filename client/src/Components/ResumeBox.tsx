import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAppSelector } from '../Redux/hooks'
import { TPosting } from '../Types/tposting'
import { stringToDate } from '../Utils/dateFunctions'

const Container = styled.div`
    padding: 50px;
    background-color: white;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px #999;
    margin-bottom: 40px;
    background: radial-gradient(white, #D7FFC3);

    @media(max-width: 750px) {
        padding: 10px;
    }
`
const Title = styled.h3`
    margin-bottom: 30px;
    color: #555;
    font-size: 18px;

    >span {
        color: #2783E5;
        font-size: 26px;
        font-weight: 600;
    }

    @media(max-width: 750px) {
        margin-bottom: 20px;
    }
`
const WrapperTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    @media(max-width: 750px) {
        flex-direction: column;
        margin-top: 20px;
    }
`
const WrapperBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
`
const InfoBox = styled.div`
    padding: 10px 20px;
    margin: 10px;
    width: 200px;
    border-radius: 10px;
    box-shadow: 2px 2px 5px #999;
    background-color: white;
    height: 75px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`
const InfoTitle = styled.h4`
    margin-top: 5px;
    font-weight: 400;
    color: #555;
    font-size: 18px;
`
const InfoValue = styled.p<{ color: string }>`
    margin-top: -5px;
    text-align: end;
    font-size: 22px;
    font-weight: 600;
    color: ${props => props.color};
`
const Button = styled.button`
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: inherit   ;
    border: none;
    font-size: 22px;
    font-weight: 600;
    color: #1BB620;
`

export const ResumeBox = () => {

    const accounts = useAppSelector(state => state.accounts.accounts)
    const reduxPostings = useAppSelector(state => state.postings.postings)

    const [postings, setPostings] = useState<TPosting[]>([])

    useEffect(() => {
        // Set Postings with Date type
        setPostings(reduxPostings.map((item) => (Object.assign({}, item, { date: stringToDate(item.date) }))))
    }, [reduxPostings])

    return (
        <Container>
            <WrapperTop>
                <Title>Hello, John Doe</Title>
                <Title>
                    Saldo Total: $ <span>{accounts.reduce((sum, account) => sum + account.balance, 0)}</span>
                </Title>
            </WrapperTop>
            <WrapperBottom>
                <InfoBox>
                    <InfoTitle>Receita Mensal</InfoTitle>
                    <InfoValue color='#1BB620'>$ {postings
                        .filter(item => item.type === 'Income')
                        .reduce((sum, posting) => sum + posting.value, 0)}
                    </InfoValue>
                </InfoBox>
                <InfoBox>
                    <InfoTitle>Despesa Mensal</InfoTitle>
                    <InfoValue color='#FF2D2D'>$ {postings
                        .filter(item => item.type === 'Expense')
                        .reduce((sum, posting) => sum + posting.value, 0)}
                    </InfoValue>
                </InfoBox>
                <InfoBox>
                    <InfoTitle>Balanço Mensal</InfoTitle>
                    <InfoValue color='#2783E5'>$ {postings
                        .filter(item => item.type === 'Income')
                        .reduce((sum, posting) => sum + posting.value, 0) -
                        postings
                            .filter(item => item.type === 'Expense')
                            .reduce((sum, posting) => sum + posting.value, 0)
                    }
                    </InfoValue>
                </InfoBox>
                <Link to='/app/postings'><InfoBox><Button>Lançamentos</Button></InfoBox></Link>
            </WrapperBottom>
        </Container>
    )
}
