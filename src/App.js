import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
import Comments from "./components/Comments";
import Form from "./components/Form";
import Follow from "./components/Follow";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./containers/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
                <Dashboard />
              // {/* </ProtectedRoute> */}
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/comments/:id" element={<Comments />} />
          <Route exact path="/create" element={<Form />} />
          <Route exact path="/follow" element={<Follow />} />
        </Routes>
      </UserAuthContextProvider>
    </Router>
  );
}

export default App;
