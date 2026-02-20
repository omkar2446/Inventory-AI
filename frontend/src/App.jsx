import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProductForm from "./pages/ProductForm"
import Architecture from "./pages/Architecture"

import ProtectedRoute from "./components/ProtectedRoute"

export default function App(){
return(
<BrowserRouter>

<Routes>

{/* PUBLIC */}
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

{/* PRIVATE */}
<Route
path="/"
element={
<ProtectedRoute>
<Dashboard/>
</ProtectedRoute>
}
/>

<Route
path="/products"
element={
<ProtectedRoute>
<ProductForm/>
</ProtectedRoute>
}
/>

<Route
path="/architecture"
element={
<ProtectedRoute>
<Architecture/>
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>
)
}