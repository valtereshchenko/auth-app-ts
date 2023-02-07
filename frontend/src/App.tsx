import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./AuthProvider";
import ShoppingList from "./pages/ShoppingList";
import { RequireAuth } from "./RequiredAuth";
import { useLoader } from "./LoadContext";

function App() {
  const loadingContext = useLoader();
  const isLoading = loadingContext?.isLoading;
  return (
    <AuthProvider>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Router>
          <Header />
          <main className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <ShoppingList />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </Router>
      )}
    </AuthProvider>
  );
}

export default App;
