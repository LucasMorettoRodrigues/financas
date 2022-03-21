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
    margin-bottom: 8px;
`
const TDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #E8E8E8;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color: #999;
    font-weight: 500;
    font-size: 14px;
`
const TCategory = styled.div`
    flex: 1;
    color: #333;
    font-weight: 500;
    font-size: 15px;
    
`
const TDescription = styled.div`
    flex: 1.5;
    color: #555;
    font-weight: 100;
    font-size: 19px;
`
const TableAccount = styled.div`
    flex: 1;
    font-size: 15px;
    font-weight: 400;
    color: #888;
    font-style: italic;
`
const TValue = styled.div<{ color: string }>`
    width: 100px;
    text-align: end;
    color: ${props => props.color};
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1px;
`
const Info = styled.div`
    text-align: center;
    font-style: italic;
    letter-spacing: 1.5px;
    color: #888;
    margin-bottom: 10px;
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
                            {postings.length > 0
                                ?
                                postings.map(posting => (
                                    <TableItem key={posting.id}>
                                        <TDate>{posting.date.getDate() < 10 && '0'}{posting.date.getDate()}</TDate>
                                        <TCategory>{posting.category}</TCategory>
                                        <TDescription>{posting.description}</TDescription>
                                        <TableAccount>{accounts.find(account => account.id === posting.account_id)!.name}</TableAccount>
                                        <TValue color={posting.value < 0 ? 'red' : 'green'}>
                                            {posting.value}
                                        </TValue>
                                    </TableItem>
                                ))
                                : <Info>Não há lançamentos cadastrados para este mês.</Info>
                            }
                        </PostingsDiv>
                    </Box>
                </Wrapper>
            </Container>
        </>
    )
}
