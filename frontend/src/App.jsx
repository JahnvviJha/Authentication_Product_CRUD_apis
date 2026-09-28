import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import RegisterPage from "./pages/RegisterPage";

// redirect to login if not authenticated
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/products/new"
          element={
            <PrivateRoute>
              <AddProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <PrivateRoute>
              <EditProductPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
