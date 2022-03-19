import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Overview } from "./Pages/Overview";
import { Postings } from "./Pages/Postings";

import { accounts as accountsData } from './Data/accounts'
import { postings as postingData } from './Data/postings'
import { users as usersData } from './Data/users'

import { TAccount } from './Types/taccount'
import { TPosting } from './Types/tposting'

function App() {

  const currentUser = usersData[0]
  const [accounts, setAccounts] = useState<TAccount[]>([])
  const [postings, setPostings] = useState<TPosting[]>([])
  const [filteredPostings, setFilteredPostings] = useState<TPosting[]>([])
  const [currentDate, setCurrentDate] = useState(new Date(2022, 3, 10))

  useEffect(() => {
    setPostings(postingData.filter((item) => item.user_id === currentUser.id))
    setAccounts(accountsData.filter((item) => item.user_id === currentUser.id))
  }, [currentUser.id])

  useEffect(() => {
    setFilteredPostings(postings.filter(item => item.date.getMonth() === currentDate.getMonth()))
  }, [postings, currentDate])

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
