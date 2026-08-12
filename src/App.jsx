import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BoardsPage from "./pages/BoardsPage";
import BoardPage from "./pages/BoardPage";
import "./App.css";

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/boards/:board_id" element={<BoardPage />} />

        <Route path="*" element={<Navigate to="/boards" replace/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;