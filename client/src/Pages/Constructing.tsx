import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px;
    flex-direction: column;
    min-height: 80vh;
`

const Message = styled.p`
    font-size: 30px;
`

const Button = styled.button`
    text-align: center;
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

export const Constructing = () => {
    return (
        <Container>
            <Message>Pagina em construção, visite a aplicação.</Message>
            <Link to={'/app'}><Button>Ir para o App</Button></Link>
        </Container>
    )
}
