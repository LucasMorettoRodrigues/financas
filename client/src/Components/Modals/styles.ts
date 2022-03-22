import styled from "styled-components"

export const Title = styled.h4`
    margin-bottom: 15px;
    color: #666;

    @media(max-width: 750px) {
        margin-bottom: 5px;
    }
`
export const InputLabel = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    color: #555;
    margin-bottom: 10px;

    @media(max-width: 750px) {
        font-size: 14px;
        margin-bottom: 5px;
    }
`
export const Input = styled.input`
    width: 100%;
    padding: 8px 18px;
    border-radius: 5px;
    border: 1px solid #999;
    outline-color: lightblue;
    font-size: 15px;

    @media(max-width: 750px) {
        padding: 4px 9px;
    }
`
export const Select = styled.select`
    width: 100%;
    padding: 8px 18px;
    border-radius: 5px;
    border: 1px solid #999;
    background-color: white;
    outline-color: lightblue;
    font-size: 15px;

    @media(max-width: 750px) {
        padding: 4px 9px;
    }
`
export const Button = styled.button`
    padding: 8px 18px;
    color: white;
    background-color: green;
    font-weight: bold;
    font-size: 15px;
    border-radius: 10px;
    border: none;
    margin-top: 10px;
    width: 100%;
    cursor: pointer;
    font-size: 15px;

    @media(max-width: 750px) {
        padding: 4px 9px;
    }
`