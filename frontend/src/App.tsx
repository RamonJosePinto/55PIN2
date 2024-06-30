import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.ui";
import "./App.css";
import RegisterPage from "./pages/RegisterPage/RegisterPage.ui";
import UserPage from "./pages/UserPage/UserPage.ui";
import WorkPage from "./pages/WorkPage/WorkPage.ui";
import ListPage from "./pages/ListPage/ListPage.ui";
import ProtectedRoute from "./ProtectedRoute"; // Importa o componente de rota protegida

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/cadastro" element={<RegisterPage />} />
                <Route path="/meus-dados" element={<ProtectedRoute element={<UserPage />} />} />
                <Route path="/obra" element={<ProtectedRoute element={<WorkPage />} />} />
                <Route path="/lista" element={<ProtectedRoute element={<ListPage />} />} />
                <Route path="/list/:searchTerm?" element={<ProtectedRoute element={<ListPage />} />} />
                <Route path="/obra/:id?" element={<ProtectedRoute element={<WorkPage />} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
