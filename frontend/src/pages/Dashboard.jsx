import React,{useEffect,useState} from "react"
import axios from "axios"
import {
AreaChart,Area,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer
} from "recharts"

import Nav from "../components/Nav"
import PriceOptimization from "../components/PriceOptimization"

export default function Dashboard(){

const [stats,setStats]=useState(null)
const [products,setProducts]=useState([])
const [loading,setLoading]=useState(true)

const load=async()=>{
try{
const [s,p]=await Promise.all([
axios.get("http://localhost:5000/api/dashboard/stats"),
axios.get("http://localhost:5000/api/products/")
])

setStats(s.data)
setProducts(Array.isArray(p.data)?p.data:p.data.products||[])
}catch(e){
console.log(e)
}
setLoading(false)
}

useEffect(()=>{load()},[])

return(
<div className="min-h-screen bg-[#f8fafc] text-slate-900">

<Nav/>

<main className="max-w-7xl mx-auto px-4 py-10 space-y-10">

{/* HEADER */}
<header className="flex justify-between items-center">
<div>
<h1 className="text-3xl font-extrabold">Inventory Dashboard</h1>
<p className="text-slate-500 text-sm">AI powered stock monitoring</p>
</div>

<button
onClick={load}
className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
Refresh
</button>
</header>

{/* STATS */}
<section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
<Stat title="Total" value={stats?.total_products} icon="📦"/>
<Stat title="Low Stock" value={stats?.low_stock} icon="⚠️"/>
<Stat title="Overstock" value={stats?.overstock} icon="📈"/>
<Stat title="Expiry" value={stats?.near_expiry} icon="⏰"/>
</section>

{/* CHART */}
<Card title="Demand Trend">
<div className="h-[320px]">
<ResponsiveContainer>
<AreaChart data={[
{name:"Mon",v:10},
{name:"Tue",v:20},
{name:"Wed",v:15},
{name:"Thu",v:25},
{name:"Fri",v:18}
]}>
<CartesianGrid strokeDasharray="3 3" vertical={false}/>
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
<Area type="monotone" dataKey="v" stroke="#6366f1" fill="#6366f122"/>
</AreaChart>
</ResponsiveContainer>
</div>
</Card>

{/* SUGGESTIONS */}
<Card title="AI Suggestions">
{stats?.recent_suggestions?.length>0?(
<div className="grid sm:grid-cols-2 gap-4">
{stats.recent_suggestions.map(s=>(
<div key={s.id} className="p-4 rounded-xl bg-slate-50 border hover:shadow transition">
<span className="text-xs font-bold text-indigo-600 uppercase">{s.type}</span>
<p className="text-sm text-slate-600 mt-1">{s.description}</p>
</div>
))}
</div>
):(
<p className="text-slate-400">No suggestions</p>
)}
</Card>

{/* PRODUCTS */}
<Card title="Inventory List">
<div className="overflow-auto">
<table className="w-full text-sm">

<thead className="bg-slate-50">
<tr>
<th className="p-3 text-left">Product</th>
<th className="p-3 text-center">Stock</th>
<th className="p-3 text-right">Price</th>
</tr>
</thead>

<tbody>
{products.map(p=>(
<tr key={p.id} className="border-b hover:bg-slate-50">
<td className="p-3 font-medium">{p.name}</td>
<td className="p-3 text-center">{p.quantity}</td>
<td className="p-3 text-right font-semibold">₹{p.price}</td>
</tr>
))}
</tbody>

</table>
</div>

</Card>

</main>
<PriceOptimization/>    
</div>
)
}

/* ⭐ STAT */
function Stat({title,value,icon}){
return(
<div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
<div className="flex justify-between">
<div>
<p className="text-sm text-slate-500">{title}</p>
<p className="text-3xl font-bold">{value??0}</p>
</div>
<div className="text-2xl">{icon}</div>
</div>
</div>
)
}

/* ⭐ CARD */
function Card({title,children}){
return(
<div className="bg-white rounded-2xl shadow-sm border p-6">
<h2 className="font-bold text-lg mb-4">{title}</h2>
{children}
</div>
)
}