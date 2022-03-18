import styled from 'styled-components'
import { AccountsBox } from '../Components/AccountsBox'
import { ActionsBox } from '../Components/ActionsBox'
import { AppNavbar } from '../Components/AppNavbar'
import { ResumeBox } from '../Components/ResumeBox'

const Container = styled.div`
    background-color: #F9F9F9;
`

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 0;
`

export const Overview = () => {
    return (
        <>
            <AppNavbar />
            <Container>
                <Wrapper>
                    <ResumeBox />
                    <ActionsBox />
                    <AccountsBox />
                </Wrapper>
            </Container>
        </>

    )
}
