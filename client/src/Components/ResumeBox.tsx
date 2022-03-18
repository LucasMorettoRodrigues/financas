import styled from 'styled-components'

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

export const ResumeBox = () => {
    return (
        <Container>
            <Wrapper>
                <Title>Hello, John Doe</Title>
                <Title>Saldo Total: $ 100.000,00</Title>
            </Wrapper>
            <Wrapper>
                <InfoBox>
                    <InfoTitle>Receitas</InfoTitle>
                    <InfoValue>$ 2.000,00</InfoValue>
                </InfoBox>
                <InfoBox>
                    <InfoTitle>Despesas</InfoTitle>
                    <InfoValue>$ 1.500,00</InfoValue>
                </InfoBox>
                <InfoBox>
                    <InfoTitle>Balanço</InfoTitle>
                    <InfoValue>$ 500,00</InfoValue>
                </InfoBox>
                <InfoBox>Ver Lançamentos</InfoBox>
            </Wrapper>
        </Container>
    )
}
