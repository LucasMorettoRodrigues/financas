import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Overview } from "./Pages/Overview";
import { Postings } from "./Pages/Postings";

import { TPosting } from './Types/tposting'

import { useAppSelector } from './Redux/hooks'
import { stringToDate } from "./Utils/dateFunctions";

function App() {

  const reduxPostings = useAppSelector(state => state.postings.postings)
  const accounts = useAppSelector(state => state.accounts.accounts)

  const [postings, setPostings] = useState<TPosting[]>([])
  const [filteredPostings, setFilteredPostings] = useState<TPosting[]>([])
  const [currentDate, setCurrentDate] = useState(new Date(2022, 3, 10))

  useEffect(() => {
    // Set Postings with Date type
    setPostings(reduxPostings.map((item) => (Object.assign({}, item, { date: stringToDate(item.date) }))))
  }, [reduxPostings])

  useEffect(() => {
    setFilteredPostings(postings.filter(item => item.date.getMonth() === currentDate.getMonth()))
  }, [currentDate, postings])

  const handleChangeDate = (action: string): void => {
    action === 'next'
      ? setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDay()))
      : setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDay()))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Overview accounts={accounts} postings={postings} />} />
        <Route path="/app/postings" element={
          <Postings
            currentDate={currentDate}
            handleChangeDate={handleChangeDate}
            postings={filteredPostings}
            accounts={accounts}
          />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
