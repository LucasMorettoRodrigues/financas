import styled from 'styled-components'
import { AppNavbar } from '../Components/AppNavbar'
import { useState } from 'react'
import { Modal } from '../Components/Modal'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { formatDate } from '../Utils/dateFunctions'
import { TPosting } from '../Types/tposting'
import { TAccount } from '../Types/taccount'

const Container = styled.div`
    background-color: #F9F9F9;
`
const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 0;
    min-height: 87vh;
`
const Box = styled.div`
    padding: 30px 40px;
    background-color: white;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px #999;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const PostingsDiv = styled.div`
    width: 100%;
`
const ContainerData = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 30px;
`
const Arrow = styled.button`
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #555;
    padding: 10px 10px;
    background-color: white;
    border: none;
    cursor: pointer;
`
const Data = styled.p`
    margin: 0 10px;
    width: 190px;
    color: #555;
    font-size: 20px;
    font-weight: 400;
`
const TableItem = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    color: #666;
`
const TDate = styled.div``
const TCategory = styled.div`
    flex: 1;
    
`
const TDescription = styled.div`
    flex: 1.5;
`
const TableAccount = styled.div`
    flex: 1;
`
const TValue = styled.div`
    width: 100px;
    text-align: end;
`

type Props = {
    currentDate: Date
    handleChangeDate: (action: string) => void,
    postings: TPosting[]
    accounts: TAccount[]
}

export const Postings = ({ currentDate, handleChangeDate, postings, accounts }: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentModal, setCurrentModal] = useState("")

    return (
        <>
            <AppNavbar />
            <Container>
                <Wrapper>
                    <Box>
                        <Modal
                            isOpen={isModalOpen}
                            closeModal={() => setIsModalOpen(false)}
                            modal={currentModal}
                        />
                        <PostingsDiv>
                            <ContainerData>
                                <Arrow onClick={() => handleChangeDate('prev')}><BsChevronLeft /></Arrow>
                                <Data>{formatDate(currentDate)}</Data>
                                <Arrow onClick={() => handleChangeDate('next')}><BsChevronRight /></Arrow>
                            </ContainerData>
                            {postings.map(posting => (
                                <TableItem key={posting.id}>
                                    <TDate>{posting.date.getDate() < 10 && '0'}{posting.date.getDate()}</TDate>
                                    <TCategory>{posting.category}</TCategory>
                                    <TDescription>{posting.description}</TDescription>
                                    <TableAccount>{accounts.find(account => account.id === posting.account_id)!.name}</TableAccount>
                                    <TValue>{posting.type === 'expense' && '-'} {posting.value}</TValue>
                                </TableItem>
                            ))}
                        </PostingsDiv>
                    </Box>
                </Wrapper>
            </Container>
        </>
    )
}
