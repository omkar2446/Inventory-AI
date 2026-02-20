import {useEffect,useState} from "react"
import axios from "axios"

export default function DemandForecast(){

const [data,setData]=useState([])

useEffect(()=>{

axios.get("http://localhost:5000/api/alerts")
.then(r=>{

const demand=r.data.filter(
x=>x.type==="demand_forecast"
)

setData(demand)

})

},[])

return(
<div className="bg-white rounded-xl shadow p-5">

<h2 className="font-bold mb-4">
AI Demand Forecast
</h2>

{data.length>0?(
<div className="space-y-3">
{data.map(d=>(
<div key={d.id} className="p-3 bg-indigo-50 border rounded">
<p className="font-semibold">{d.product}</p>
<p className="text-sm text-gray-600">{d.description}</p>
</div>
))}
</div>
):(
<p className="text-gray-400">No forecast yet</p>
)}

</div>
)
}