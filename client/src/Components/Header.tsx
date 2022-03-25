import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    height: 82vh;
    max-width: 100vw;
`
const Left = styled.div`
    flex-basis: 50%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    @media(max-width: 700px) {
        flex-basis: 100%;
    }
`
const Right = styled.div`
    flex-basis: 50%;
    height: 95%;
    margin-left: 20px;
    display: flex;
    justify-content: center;

    @media(max-width: 700px) {
        display: none;
    }
`
const Image = styled.img`
    filter: hue-rotate(175deg);
    margin-top: -40px;
    object-fit: contain;
    width: 100%;
    height: auto;
`

const PrimaryText = styled.h2`
    max-width: 450px;
    font-size: 50px;
    color: #333;

    >span {
        color: darkgreen
    }

    @media(max-width: 990px) {
        margin: 0;
        font-size: 40px;
    }
`
const SecondaryText = styled.h3`
    font-size: 25px;
    font-weight: 200;
    margin-bottom: 10px;
    color: #777;

    @media(max-width: 990px) {
        font-size: 20px
    }
`
const Button = styled.button`
    padding: 15px 80px;
    min-width: 276px;
    border-radius: 10px;
    border: 3px solid darkgreen;
    background-color: darkgreen;
    font-size: 24px;
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
