import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Overview } from "./Pages/Overview";
import { Postings } from "./Pages/Postings";
import { useAppDispatch } from "./Redux/hooks";
import { getAccounts } from "./Redux/accountsSlice";

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAccounts())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Overview />} />
        <Route path="/app/postings" element={<Postings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
