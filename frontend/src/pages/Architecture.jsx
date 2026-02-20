import React from "react";
import { Server, Cpu, Database, Layout, Bell, Activity } from "lucide-react"; // Optional: if you have lucide-react icons
import Nav from "../components/Nav";
export default function Architecture() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
    
    <Nav/>
    <div className="min-h-screen bg-[#fcfcfd] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-12 border-b border-slate-200 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Activity size={24} />
            </div>
            <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase">
              Technical Documentation
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            System Architecture
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            A high-performance <span className="text-slate-900 font-semibold">Multi-Agent Smart Retail Inventory System</span> engineered 
            to bridge the gap between IoT data streams and predictive retail logistics.
          </p>
        </header>

        {/* ARCHITECTURE FLOW DIAGRAM (VISUAL) */}
        <section className="mb-16">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
            Conceptual Data Flow
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center items-center">
            <FlowStep icon={<Layout />} title="Client Interface" desc="React & Tailwind Dashboard" />
            <div className="hidden md:block h-px bg-slate-200 relative">
              <div className="absolute -right-1 -top-1 border-t-4 border-l-4 border-transparent border-l-slate-300 w-2 h-2 rotate-45" />
            </div>
            <FlowStep icon={<Server />} title="Core Engine" desc="Flask REST API & Business Logic" />
            <div className="hidden md:block h-px bg-slate-200 relative">
              <div className="absolute -right-1 -top-1 border-t-4 border-l-4 border-transparent border-l-slate-300 w-2 h-2 rotate-45" />
            </div>
            <FlowStep icon={<Database />} title="Persistence" desc="PostgreSQL / SQLite Storage" />
          </div>
        </section>

        {/* MULTI-AGENT SECTION */}
        <section className="space-y-6 mb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Autonomous Agents</h2>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
              Powered by APScheduler
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <AgentCard 
              title="Stock Monitoring" 
              desc="Real-time tracking of inventory levels with automated low-stock triggering."
              tag="Real-time"
            />
            <AgentCard 
              title="Demand Forecast" 
              desc="Predictive analytics analyzing historical sales to suggest restocking volumes."
              tag="Predictive"
            />
            <AgentCard 
              title="Price Optimization" 
              desc="Dynamic pricing engine adjusting margins based on expiry dates and demand."
              tag="Optimization"
            />
            <AgentCard 
              title="Supply Analysis" 
              desc="Evaluates vendor lead times and suggests optimal procurement windows."
              tag="Logistics"
            />
          </div>
        </section>

        {/* SCALABILITY FOOTER */}
        <footer className="bg-slate-900 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Scalability & Cloud Readiness</h3>
              <p className="text-slate-400 text-sm max-w-xl">
                The architecture is container-ready (Docker) and supports horizontal scaling. 
                IoT integration is handled via a decoupled simulation layer, allowing for seamless 
                transition to physical MQTT or AMQP sensors.
              </p>
            </div>
            <button className="whitespace-nowrap bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition shadow-lg">
              View API Docs
            </button>
          </div>
        </footer>
      </div>
    </div>
    </div>
  );
}

/* ⭐ SUB-COMPONENTS */

function FlowStep({ icon, title, desc }) {
  return (
    <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <div className="flex justify-center text-indigo-600 mb-3">{icon}</div>
      <h3 className="font-bold text-slate-800 text-sm mb-1">{title}</h3>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  );
}

function AgentCard({ title, desc, tag }) {
  return (
    <div className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
          <Cpu className="text-slate-400 group-hover:text-indigo-600" size={20} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{tag}</span>
      </div>
      <h3 className="font-bold text-slate-800 mb-2">{title} Agent</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}