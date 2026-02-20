import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

export default function Login(){

const navigate = useNavigate()

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [error,setError]=useState("")
const [loading,setLoading]=useState(false)

const handleLogin = async(e)=>{
e.preventDefault()

try{
setLoading(true)

const res = await axios.post(
"http://localhost:5000/api/auth/login",
{email,password}
)

localStorage.setItem("token",res.data.access_token)

navigate("/")

}catch(err){
setError("Invalid credentials")
}
finally{
setLoading(false)
}
}

return(
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100">

<div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

<h2 className="text-2xl font-bold mb-2 text-center text-indigo-600">
Welcome Back 👋
</h2>

<p className="text-center text-gray-400 text-sm mb-6">
Login to continue
</p>

{error && (
<p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
{error}
</p>
)}

<form onSubmit={handleLogin} className="space-y-4">

<input
type="email"
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={e=>setPassword(e.target.value)}
className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
required
/>

<button
type="submit"
disabled={loading}
className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
>
{loading?"Logging in...":"Login"}
</button>

</form>

{/* ⭐ SIGNUP OPTION */}
<div className="mt-6 text-center text-sm text-gray-500">
Don’t have an account?{" "}
<Link
to="/register"
className="text-indigo-600 font-semibold hover:underline"
>
Sign up
</Link>
</div>

</div>
</div>
)
}