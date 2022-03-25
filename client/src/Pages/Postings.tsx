import styled from 'styled-components'
import { AppNavbar } from '../Components/AppNavbar'
import { useEffect, useState } from 'react'
import { Modal } from '../Components/Modal'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { formatDate, stringToDate } from '../Utils/dateFunctions'
import { TPosting } from '../Types/tposting'
import { useAppSelector } from '../Redux/hooks'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { useAppDispatch } from '../Redux/hooks'
import { deletePostingById } from '../Redux/postingsSlice'

const Container = styled.div`
    background-color: #F9F9F9;
`
const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 10px;
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

    @media(max-width: 750px) {
        padding: 30px 10px;
    }
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
    margin-bottom: 8px;
    flex-wrap: wrap;

    @media(max-width: 562px) {
        margin-bottom: 10px;
    }
`
const TDate = styled.div`
    margin: 5px;
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
    min-width: 35px;
`
const TCategory = styled.div`
    margin: 5px;
    color: #333;
    font-weight: 500;
    font-size: 15px;
    width: 110px;
    min-width: 110px;
    
    @media(max-width: 562px) {
        width: 70%;
    }
`
const TDescription = styled.div`
    flex: 1.5;
    color: #555;
    font-weight: 100;
    font-size: 19px;
    margin: 5px;

    @media(max-width: 750px) {
        min-width: 200px;
    }

    @media(max-width: 562px) {
        min-width: 340px;
        margin-left: 50px;
    }
`
const TableAccount = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: #888;
    font-style: italic;
    width: 100px;
    margin-left: 10px;

    @media(max-width: 750px) {
        display: none;
    }
`
const TValue = styled.div<{ color: string }>`
    margin: 5px;
    width: 80px;
    text-align: end;
    color: ${props => props.color};
    font-size: 18px;
    font-weight: 400;
    margin-left: 10px;
    min-width: 80px;

    @media(max-width: 562px) {
        flex: 1;
        margin-left: 50px;
        text-align: left;
    }
`
const Info = styled.div`
    text-align: center;
    font-style: italic;
    letter-spacing: 1.5px;
    color: #888;
    margin-bottom: 10px;
`
const Buttons = styled.div`
    margin: 5px;
    display: flex;

    @media(max-width: 562px) {
        flex: 1;
        justify-content: right;
        margin-left: 50px;
    }
`
const Button = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background-color: white;
    cursor: pointer;
    margin-right: 5px;
    color: #888;

    &:hover {
        color: black;
    }
`

export const Postings = () => {

    const reduxPostings = useAppSelector(state => state.postings.postings)
    const accounts = useAppSelector(state => state.accounts.accounts)
    const dispatch = useAppDispatch()

    const [postings, setPostings] = useState<TPosting[]>([])
    const [filteredPostings, setFilteredPostings] = useState<TPosting[]>([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [postingToEdit, setPostingToEdit] = useState<TPosting | null>(null)

    useEffect(() => {
        // Set Postings with Date type
        setPostings(reduxPostings.map((item) => (Object.assign({}, item, { date: stringToDate(item.date) }))))
    }, [reduxPostings])

    useEffect(() => {
        setFilteredPostings(postings.filter(item => item.date.getMonth() === currentDate.getMonth() + 1))
    }, [currentDate, postings])

    const handleChangeDate = (action: string): void => {
        action === 'next'
            ? setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
            : setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const handleCreate = (posting: TPosting) => {
        setPostingToEdit(posting)
        setIsModalOpen(true)
    }

    const handleDelete = (posting: TPosting) => {
        dispatch(deletePostingById(posting.id))
    }

    return (
        <>
            <AppNavbar />
            <Container>
                <Wrapper>
                    <Box>
                        <PostingsDiv>
                            <ContainerData>
                                <Arrow onClick={() => handleChangeDate('prev')}><BsChevronLeft /></Arrow>
                                <Data>{formatDate(currentDate)}</Data>
                                <Arrow onClick={() => handleChangeDate('next')}><BsChevronRight /></Arrow>
                            </ContainerData>
                            {filteredPostings.length > 0
                                ?
                                filteredPostings.map((posting, index) => (
                                    <TableItem key={index}>
                                        <Modal
                                            isOpen={postingToEdit === posting ? isModalOpen : false}
                                            closeModal={() => setIsModalOpen(false)}
                                            modal={`edit${posting.type}`}
                                            data={posting}
                                        />
                                        <TDate>{posting.date.getDate() < 10 && '0'}{posting.date.getDate()}</TDate>
                                        <TCategory>{posting.category}</TCategory>
                                        <TDescription>{posting.description}</TDescription>
                                        <TableAccount>
                                            {accounts.find(account => account.id === posting.account_id)!.name}
                                        </TableAccount>
                                        <TValue color={posting.value < 0 ? '#FF2D2D' : '#1BB620'}>
                                            {posting.value}
                                        </TValue>
                                        <Buttons>
                                            <Button onClick={() => handleCreate(posting)}><FaRegEdit fontSize='16px' /></Button>
                                            <Button onClick={() => handleDelete(posting)}><FaRegTrashAlt fontSize='16px' /></Button>
                                        </Buttons>
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
