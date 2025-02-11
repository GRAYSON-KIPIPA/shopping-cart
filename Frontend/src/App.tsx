import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateProduct from "./pages/CreateProduct";
import Dashboard from "./pages/Dashboard";
import NavBarWrapper from "./components/NavBarWrapper";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import ViewProduct from "./components/ViewProduct";
import Admin from "./components/Admin";
import UserInfo from "./pages/UserInfo";
import AdminProtect from "./components/AdminProtect";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route element={<NavBarWrapper />}>
            <Route
              path="/add-product"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-product/:id"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ViewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-info/:id"
              element={
                <ProtectedRoute>
                  <UserInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminProtect>
                  <Admin />
                </AdminProtect>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
