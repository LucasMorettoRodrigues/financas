import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Overview } from "./Pages/Overview";
import { Postings } from "./Pages/Postings";
import { useAppDispatch } from "./Redux/hooks";
import { getAccounts } from "./Redux/accountsSlice";
import { getPostings } from "./Redux/postingsSlice";
import { Constructing } from "./Pages/Constructing";
import { NotFound } from "./Pages/NotFound";

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAccounts())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPostings())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/financas" element={<Home />} />
        <Route path="/app" element={<Overview />} />
        <Route path="/app/postings" element={<Postings />} />
        <Route path="/constructing" element={<Constructing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
