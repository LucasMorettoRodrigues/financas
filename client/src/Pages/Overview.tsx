import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AccountsBox } from '../Components/AccountsBox'
import { ActionsBox } from '../Components/ActionsBox'
import { AppNavbar } from '../Components/AppNavbar'
import { ResumeBox } from '../Components/ResumeBox'

import { accounts as accountsData } from '../Data/accounts'
import { postings as postingData } from '../Data/postings'
import { users as usersData } from '../Data/users'
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

export const Overview = () => {

    const currentUser = usersData[0]
    const [accounts, setAccounts] = useState<TAccount[]>([])
    const [postings, setPostings] = useState<TPosting[]>([])

    useEffect(() => {
        setPostings(postingData.filter((item) => item.user_id === currentUser.id))
        setAccounts(accountsData.filter((item) => item.user_id === currentUser.id))
    }, [accounts])

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
