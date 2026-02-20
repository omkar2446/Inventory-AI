import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

export default function Register(){

  const navigate = useNavigate()

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  })

  const submit = async(e)=>{
    e.preventDefault()

    try{
      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      )

      alert("Account created")
      navigate("/login")

    }catch{
      alert("Registration failed")
    }
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Sign Up
        </h2>

        <form onSubmit={submit} className="space-y-4">

          <input
            placeholder="Name"
            className="w-full border p-3 rounded"
            onChange={e=>setForm({...form,name:e.target.value})}
          />

          <input
            placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={e=>setForm({...form,email:e.target.value})}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            onChange={e=>setForm({...form,password:e.target.value})}
          />

          <button className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700">
            Create Account
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}