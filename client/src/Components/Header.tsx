import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
    min-height: 90vh;
    display: flex;
`
const Left = styled.div`
    flex: 1;
`
const Right = styled.div`
    flex: 1;
`
const PrimaryText = styled.h2`
    margin-top: 80px;
    margin-left: 10px;
    margin-bottom: 20px;
    font-size: 50px;
    color: #222;

    >span {
        color: darkgreen
    }
`
const SecondaryText = styled.h3`
    margin-left: 10px;
    margin-bottom: 30px;
    font-size: 25px;
    font-weight: 200;
    color: #444;
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
`
const Image = styled.img`
    filter: hue-rotate(175deg);
    margin-top: -60px;
    height: 580px;
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
