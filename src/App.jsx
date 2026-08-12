import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BoardsPage from "./pages/BoardsPage";
import "./App.css";

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/boards" element={<BoardsPage />} />

        <Route path="*" element={<Navigate to="/boards" replace/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;