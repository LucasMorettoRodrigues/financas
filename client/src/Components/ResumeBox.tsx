import styled from 'styled-components'
import { TAccount } from '../Types/taccount'
import { TPosting } from '../Types/tposting'

const Container = styled.div`
    padding: 40px;
    background-color: white;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px #999;
    margin-bottom: 40px;
`
const Title = styled.h3`
    margin-bottom: 40px;
    color: #555;
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const InfoBox = styled.div`
    padding: 10px 30px;
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
    margin-bottom: 10px;
    color: #333;

`
const InfoValue = styled.p`
    margin-left: 20px;
    font-size: 20px;
    font-weight: 200;
`

type Props = {
    accounts: TAccount[]
    postings: TPosting[]
}

export const ResumeBox = ({ accounts, postings }: Props) => {
    return (
        <Container>
            <Wrapper>
                <Title>Hello, John Doe</Title>
                <Title>
                    Saldo Total: $ {accounts.reduce((sum, account) => sum + account.balance, 0)}
                </Title>
            </Wrapper>
            <Wrapper>
                <InfoBox>
                    <InfoTitle>Receitas</InfoTitle>
                    <InfoValue>$ {postings
                        .filter(item => item.type === 'income')
                        .reduce((sum, posting) => sum + posting.value, 0)}
                    </InfoValue>
                </InfoBox>
                <InfoBox>
                    <InfoTitle>Despesas</InfoTitle>
                    <InfoValue>$ {postings
                        .filter(item => item.type === 'expense')
                        .reduce((sum, posting) => sum + posting.value, 0)}
                    </InfoValue>
                </InfoBox>
                <InfoBox>
                    <InfoTitle>Balanço</InfoTitle>
                    <InfoValue>$ {postings
                        .filter(item => item.type === 'income')
                        .reduce((sum, posting) => sum + posting.value, 0) -
                        postings
                            .filter(item => item.type === 'expense')
                            .reduce((sum, posting) => sum + posting.value, 0)
                    }
                    </InfoValue>
                </InfoBox>
                <InfoBox>Ver Lançamentos</InfoBox>
            </Wrapper>
        </Container>
    )
}
