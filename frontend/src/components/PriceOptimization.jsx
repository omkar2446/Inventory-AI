import {useEffect,useState} from "react"
import axios from "axios"

export default function PriceOptimization(){

const [data,setData]=useState([])

useEffect(()=>{

axios.get("http://localhost:5000/api/alerts")
.then(r=>{
setData(
r.data.filter(
x=>x.type==="price_discount"||x.type==="clearance"
)
)
})

},[])

return(
<div className="bg-white rounded-xl shadow p-5">

<h2 className="font-bold mb-4">
Dynamic Pricing Suggestions
</h2>

{data.length>0?data.map(d=>(
<div key={d.id} className="p-3 bg-green-50 border rounded mb-2">
<p className="font-semibold">{d.product}</p>
<p className="text-sm">{d.description}</p>
</div>
)):<p className="text-gray-400">No pricing suggestions</p>}

</div>
)
}