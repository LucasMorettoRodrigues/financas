import styled from "styled-components"

const Errors = styled.div`
    position: fixed;
    top: 50;
    right: 0;
    width: 250px;
    height: 90px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    background-color: #E8E8E8;

    @media(max-width: 750px) {
        width: 180px;
    }
`
const ErrorIcon = styled.div`
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    font-size: 30px;
    font-weight: bold;
    color: white;

    @media(max-width: 750px) {
        width: 20px;
        font-size: 20px;
        font-weight: 400;
    }
`

const ErrorMessages = styled.div`
    padding: 5px;

    @media(max-width: 750px) {
        padding: 2px;
    }
`
const Msg = styled.p`
    font-size: 12px;
    color: #666;
    margin: 2px 10px;
    font-weight: 500;
    font-style: italic;

    @media(max-width: 750px) {
        font-weight: 100;
        margin: 2px;
    }
`

type Props = {
    errors: string[]
}

export const Error = ({ errors }: Props) => {
    return (
        <Errors>
            <ErrorIcon>!</ErrorIcon>
            <ErrorMessages>
                {errors.map((error, index) => <Msg key={index}>{error}</Msg>)}
            </ErrorMessages>
        </Errors>
    )
}
