import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AccountsBox } from '../Components/AccountsBox'
import { ActionsBox } from '../Components/ActionsBox'
import { AppNavbar } from '../Components/AppNavbar'
import { ResumeBox } from '../Components/ResumeBox'
import { TAccount } from '../Types/taccount'
import { TPosting } from '../Types/tposting'

const Container = styled.div`
    background-color: #F9F9F9;
`

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 0;
`

type Props = {
    accounts: TAccount[]
    postings: TPosting[]
}

export const Overview = ({ accounts, postings }: Props) => {
    return (
        <>
            <AppNavbar />
            <Container>
                <Wrapper>
                    <ResumeBox accounts={accounts} postings={postings} />
                    <ActionsBox />
                    <AccountsBox accounts={accounts} />
                </Wrapper>
            </Container>
        </>

    )
}
