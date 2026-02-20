import {useState,useEffect} from "react"
import axios from "axios"

export default function NotificationPanel(){

const [open,setOpen]=useState(false)
const [notifications,setNotifications]=useState([])

useEffect(()=>{
axios.get("http://localhost:5000/api/dashboard/stats")
.then(r=>{
setNotifications(r.data.recent_suggestions||[])
})
},[])

return(
<div className="relative">

{/* 🔔 Bell */}
<button
onClick={()=>setOpen(!open)}
className="text-xl"
>
🔔
</button>

{/* PANEL */}
{open && (
<div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl p-4 z-50">

<h3 className="font-bold mb-3">Notifications</h3>

{notifications.length>0?(
<div className="space-y-2 max-h-64 overflow-auto">
{notifications.map(n=>(
<div key={n.id} className="p-2 bg-yellow-50 rounded border text-sm">
<b>{n.type}</b>
<p>{n.description}</p>
</div>
))}
</div>
):(
<p className="text-gray-400">No notifications</p>
)}

</div>
)}

</div>
)
}
