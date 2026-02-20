import { Link, useNavigate } from "react-router-dom"
import NotificationPanel from "./NotificationPanel"
export default function Nav(){

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const logout = ()=>{
    localStorage.removeItem("token")
    navigate("/login")
  }

  return(
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      {/* LOGO */}
      <Link to="/" className="text-xl font-bold text-indigo-600">
        Inventory AI
      </Link>

      {/* MENU */}
      <div className="space-x-6 flex items-center">
        <NotificationPanel/>

        <Link to="/" className="text-gray-600 hover:text-indigo-600">
          Dashboard
        </Link>

        

        <Link to="/products" className="text-gray-600 hover:text-indigo-600">
          Products
        </Link>
        <Link to="/architecture" className="text-gray-600 hover:text-indigo-600">
          Architecture
        </Link> 

        {!token ? (
          <>
            <Link to="/login" className="text-gray-600 hover:text-indigo-600">
              Login
            </Link>

            
          </>
        ):(
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}

      </div>
    </div>
  )
}