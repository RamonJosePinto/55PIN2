import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.ui";
import "./App.css";
import RegisterPage from "./pages/RegisterPage/RegisterPage.ui";
import UserPage from "./pages/UserPage/UserPage.ui";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/cadastro" element={<RegisterPage />} />
                <Route path="/meus-dados" element={<UserPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
