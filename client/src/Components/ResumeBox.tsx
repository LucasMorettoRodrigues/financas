import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAppSelector } from '../Redux/hooks'
import { TPosting } from '../Types/tposting'
import { stringToDate } from '../Utils/dateFunctions'

const Container = styled.div`
    padding: 40px;
    background-color: white;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px #999;
    margin-bottom: 40px;
    background: radial-gradient(white, #D7FFC3);
`
const Title = styled.h3`
    margin-bottom: 40px;
    color: #111;
    font-size: 16px;
    letter-spacing: 2px;
    font-style: italic;

    >span {
        color: #2783E5;
        font-size: 20px;
        font-weight: 500;
        font-style: normal;
        letter-spacing: 1px;
    }
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const InfoBox = styled.div`
    padding: 10px 20px;
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
    margin-bottom: 4px;
    letter-spacing: 1.6px;
    font-weight: 400;
    font-style: italic;
    color: #444;
    font-size: 16px;
`
const InfoValue = styled.p<{ color: string }>`
    text-align: end;
    font-size: 20px;
    font-weight: 400;
    color: ${props => props.color};
`
const Button = styled.button`
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: inherit   ;
    border: none;
    font-size: 16px;
    letter-spacing: 2px;
    font-weight: 600;
    color: green;
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
            <Wrapper>
                <Title>Hello, John Doe</Title>
                <Title>
                    Saldo Total: $ <span>{accounts.reduce((sum, account) => sum + account.balance, 0)}</span>
                </Title>
            </Wrapper>
            <Wrapper>
                <InfoBox>
                    <InfoTitle>Receita Mensal</InfoTitle>
                    <InfoValue color='green'>$ {postings
                        .filter(item => item.type === 'income')
                        .reduce((sum, posting) => sum + posting.value, 0)}
                    </InfoValue>
                </InfoBox>
                <InfoBox>
                    <InfoTitle>Despesa Mensal</InfoTitle>
                    <InfoValue color='red'>$ {postings
                        .filter(item => item.type === 'expense')
                        .reduce((sum, posting) => sum + posting.value, 0)}
                    </InfoValue>
                </InfoBox>
                <InfoBox>
                    <InfoTitle>Balanço Mensal</InfoTitle>
                    <InfoValue color='#2783E5'>$ {postings
                        .filter(item => item.type === 'income')
                        .reduce((sum, posting) => sum + posting.value, 0) -
                        postings
                            .filter(item => item.type === 'expense')
                            .reduce((sum, posting) => sum + posting.value, 0)
                    }
                    </InfoValue>
                </InfoBox>
                <Link to='/app/postings'><InfoBox><Button>Lançamentos</Button></InfoBox></Link>
            </Wrapper>
        </Container>
    )
}
