import React, { useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";

export default function ProductForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    expiry_date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.name || !form.price) {
      setMessage("⚠️ Name and price are required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post("https://inven-ai-backend-3.onrender.com/api/products/", {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      setMessage("✅ Product added successfully");
      setForm({ name: "", category: "", price: "", quantity: "", expiry_date: "" });
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);

    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen bg-[#f8fafc] text-slate-900">

<Nav/>
    <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-3.5">
      
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-slate-50 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Add New Product
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wider">
          Inventory Management System
        </p>
      </div>

      {/* FORM BODY */}
      <div className="p-6 space-y-5">
        
        <div className="grid grid-cols-1 gap-5">
          <Field label="Product Name">
            <Input 
              name="name" 
              placeholder="e.g. Wireless Mouse" 
              value={form.name} 
              onChange={handleChange} 
            />
          </Field>

          <Field label="Category">
            <Input 
              name="category" 
              placeholder="e.g. Electronics" 
              value={form.category} 
              onChange={handleChange} 
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (₹)">
              <Input 
                name="price" 
                type="number" 
                placeholder="0.00" 
                value={form.price} 
                onChange={handleChange} 
              />
            </Field>

            <Field label="Quantity">
              <Input 
                name="quantity" 
                type="number" 
                placeholder="100" 
                value={form.quantity} 
                onChange={handleChange} 
              />
            </Field>
          </div>

          <Field label="Expiry Date">
            <Input 
              name="expiry_date" 
              type="date" 
              value={form.expiry_date} 
              onChange={handleChange} 
            />
          </Field>
        </div>


        {/* STATUS MESSAGE */}
        {message && (
          <div className={`p-3 rounded-lg text-sm font-medium text-center animate-in fade-in slide-in-from-top-1 ${
            message.includes("✅") 
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
              : "bg-red-50 text-red-700 border border-red-100"
          }`}>
            {message}
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          onClick={submit}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-3 shadow-md shadow-indigo-100 ${
            loading 
              ? "bg-indigo-400 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
          }`}
        >
          {loading ? <Spinner /> : null}
          {loading ? "Processing..." : "Register Product"}
        </button>
      </div>
    </div>
  </div>
  );
}

/* ⭐ FIELD COMPONENT */
function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[13px] font-bold text-slate-600 ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ⭐ INPUT COMPONENT (Capitalized for React) */
function Input(props) {
  return (
    <input
      {...props}
      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
    />
  );
}

/* ⭐ SPINNER COMPONENT */
function Spinner() {
  return (
    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
  );
}