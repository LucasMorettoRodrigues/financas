import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    min-height: 80vh;
`
const Left = styled.div`
    flex: 1;
    justify-content: center;

    @media(max-width: 920px) {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }
`
const Right = styled.div`
    margin-top: -80px;

    @media(max-width: 920px) {
        display: none;
    }
`
const PrimaryText = styled.h2`
    margin-top: 8%;
    margin-left: 10px;
    margin-right: 20px;
    font-size: 50px;
    color: #333;

    >span {
        color: darkgreen
    }

    @media(max-width: 920px) {
        margin: 0;
        font-size: 40px;
    }
`
const SecondaryText = styled.h3`
    margin-left: 10px;
    margin-bottom: 20px;
    font-size: 25px;
    font-weight: 200;
    color: #777;

    @media(max-width: 430px) {
        font-size: 20px
    }
`
const Button = styled.button`
    margin-left: 10px;
    padding: 15px 100px;
    border-radius: 10px;
    border: 3px solid darkgreen;
    background-color: darkgreen;
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
    color: white;
    transition: all .5s ease;

    &:hover {
        background-color: lightgreen;
        color: darkgreen;
    }

    @media(max-width: 430px) {
        font-size: 20px;
        margin: 0 auto;
        width: 90%;
        padding: 15px 0;
    }
`
const Image = styled.img`
    filter: hue-rotate(175deg);
    height: 550px;
    width: auto;
`

export const Header = () => {
    return (
        <Container>
            <Left>
                <PrimaryText>
                    O guia para o seu <span>sucesso</span> financeiro
                </PrimaryText>
                <SecondaryText>
                    Cadastre todos os seus gastos, monitore todas as suas contas, saiba o destino de cada centavo
                </SecondaryText>
                <Link to={'/app'}>
                    <Button>Comece já</Button>
                </Link>
            </Left>
            <Right>
                <Image src="https://cdn-icons-png.flaticon.com/512/2040/2040826.png"></Image>
            </Right>

        </Container>
    )
}
