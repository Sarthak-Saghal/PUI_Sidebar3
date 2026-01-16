import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Home, Grid, Folder, Settings, MessageCircle,
  ChevronDown, User, ShieldCheck,
  Users, FileText, Share2, Zap, Cloud, Bell, 
  PieChart, Menu, X
} from "lucide-react";

// --- High-End Animation Configs ---
const SPRING_CONFIG = { type: "spring", stiffness: 400, damping: 32 };
const DRAWER_CONFIG = { type: "spring", damping: 25, stiffness: 200 };

const itemVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 10 }
};

export default function MobileOptimizedSidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState("account");
  const [activeItem, setActiveItem] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState({ dashboard: false });

  const toggle = (key) => setOpenMenu(prev => ({ ...prev, [key]: !prev[key] }));

  const handleNavigate = (label) => {
    setActiveItem(label);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 font-sans overflow-hidden">
      
      {/* 1. Global CSS for Scrollbars & Breakpoints */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 1024px) { .desktop-only { display: none; } }
        @media (min-width: 1025px) { .mobile-only { display: none; } }
      `}} />

      {/* Ambient Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-cyan-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[5%] right-[-5%] w-[40%] h-[40%] bg-indigo-500/10 blur-[100px] rounded-full" />
      </div>

      {/* --- DESKTOP SIDEBAR --- */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 92 : 300 }}
        transition={SPRING_CONFIG}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        className="desktop-only relative z-20 m-5 flex flex-col bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <SidebarContent 
          collapsed={collapsed} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          activeItem={activeItem}
          setActiveItem={handleNavigate}
          openMenu={openMenu}
          toggle={toggle}
        />
      </motion.aside>

      {/* --- MOBILE HEADER --- */}
      <div className="mobile-only fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-5 bg-[#020617]/40 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="font-black tracking-tighter text-lg">NEON_LABS</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 active:scale-90 transition-transform"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* --- MOBILE DRAWER & BACKDROP --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Darkened Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-only fixed inset-0 z-[40] bg-black/60 backdrop-blur-sm"
            />

            {/* Reduced Width Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={DRAWER_CONFIG}
              className="mobile-only fixed top-0 left-0 bottom-0 z-[50] w-[280px] bg-[#020617] border-r border-white/10 shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                   <Zap size={18} className="text-cyan-400" fill="currentColor" />
                   <span className="text-xs font-black tracking-[0.2em] uppercase">Navigation</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full bg-white/5">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto hide-scrollbar">
                 <SidebarContent 
                    collapsed={false} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab}
                    activeItem={activeItem}
                    setActiveItem={handleNavigate}
                    openMenu={openMenu}
                    toggle={toggle}
                    isMobile
                  />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-10 mt-24 lg:mt-0 relative z-0">
        <div className="w-full h-full rounded-[2rem] border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome to NeonLabs</h1>
          <p className="text-slate-500 max-w-xs text-sm">Select a navigation item to begin exploring the enterprise dashboard.</p>
        </div>
      </main>
    </div>
  );
}

/* --- Shared Sidebar Content --- */

function SidebarContent({ collapsed, activeTab, setActiveTab, activeItem, setActiveItem, openMenu, toggle, isMobile }) {
  return (
    <>
      {/* Header (Desktop Only) */}
      {!isMobile && (
        <div className="p-6 mb-2">
          <div className={`flex items-center ${collapsed ? "justify-center" : "gap-4"}`}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <Zap size={24} fill="currentColor" />
            </div>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-black tracking-tighter italic">NEON_LABS</h2>
                <span className="text-[10px] font-bold tracking-widest text-cyan-500 uppercase">Architect UI</span>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Switcher Tabs */}
      {(isMobile || !collapsed) && (
        <div className="px-2 mb-6 flex gap-6 border-b border-white/5">
           <LayoutGroup id="tabs">
            {['account', 'shared'].map((id) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative pb-3 text-[10px] font-black tracking-widest uppercase transition-colors ${activeTab === id ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
              >
                {id}
                {activeTab === id && (
                  <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
                )}
              </button>
            ))}
          </LayoutGroup>
        </div>
      )}

      {/* Navigation List */}
      <div className={`flex-1 overflow-y-auto hide-scrollbar space-y-1 ${!isMobile && collapsed ? "" : "px-1"}`}>
        <LayoutGroup id="main-nav">
          <motion.div
            key={activeTab}
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {activeTab === "account" ? (
              <>
                <NavGroup icon={<Home />} label="Home" activeItem={activeItem} setActive={setActiveItem} collapsed={collapsed} />
                <NavGroup icon={<Grid />} label="Dashboard" activeItem={activeItem} setActive={setActiveItem} collapsed={collapsed} isOpen={openMenu.dashboard} toggle={() => toggle('dashboard')}>
                  <SubItem label="Live Metrics" />
                  <SubItem label="User Data" />
                </NavGroup>
                <NavGroup icon={<PieChart />} label="Analytics" activeItem={activeItem} setActive={setActiveItem} collapsed={collapsed} />
                <NavGroup icon={<Folder />} label="Projects" activeItem={activeItem} setActive={setActiveItem} collapsed={collapsed} />
                <NavGroup icon={<MessageCircle />} label="AI Chat" activeItem={activeItem} setActive={setActiveItem} collapsed={collapsed} badge="5" />
                <NavGroup icon={<Bell />} label="Alerts" activeItem={activeItem} setActive={setActiveItem} collapsed={collapsed} badge="NEW" />
                <NavGroup icon={<ShieldCheck />} label="Security" activeItem={activeItem} setActive={setActiveItem} collapsed={collapsed} />
                <NavGroup icon={<Settings />} label="Settings" activeItem={activeItem} setActive={setActiveItem} collapsed={collapsed} />
              </>
            ) : (
              <>
                <NavGroup icon={<Users />} label="Team Access" collapsed={collapsed} setActive={setActiveItem} activeItem={activeItem} />
                <NavGroup icon={<FileText />} label="Shared Docs" collapsed={collapsed} setActive={setActiveItem} activeItem={activeItem} />
                <NavGroup icon={<Share2 />} label="Public Links" collapsed={collapsed} setActive={setActiveItem} activeItem={activeItem} />
              </>
            )}
          </motion.div>
        </LayoutGroup>
      </div>

      {/* Profile Footer */}
      <div className={`mt-auto ${isMobile ? "pt-10" : "p-4"}`}>
        <div className={`flex items-center gap-4 p-3 rounded-[2rem] bg-white/[0.03] border border-white/5 ${collapsed && !isMobile ? "justify-center" : ""}`}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] shrink-0">
             <div className="w-full h-full rounded-2xl bg-[#020617] flex items-center justify-center">
                <User size={18} className="text-white" />
             </div>
          </div>
          {(isMobile || !collapsed) && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black truncate text-white">Nova Carter</p>
              <p className="text-[9px] font-bold text-cyan-500/80 uppercase">Enterprise</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* --- UI Sub-Components --- */

function NavGroup({ icon, label, activeItem, setActive, collapsed, isOpen, toggle, children, badge }) {
  const isActive = activeItem === label;

  return (
    <motion.div variants={itemVariants} className="w-full">
      <div
        onClick={() => { if (toggle) toggle(); setActive(label); }}
        className={`relative flex items-center px-4 py-3.5 rounded-2xl cursor-pointer transition-all group
          ${isActive ? "text-white" : "text-slate-500 hover:text-slate-200"}
          ${collapsed ? "justify-center px-0 h-14 w-14 mx-auto" : "justify-between"}
        `}
      >
        {isActive && !collapsed && (
          <motion.div layoutId="activePill" className="absolute inset-0 bg-white/[0.05] border border-white/10 rounded-2xl z-0" />
        )}
        <div className="relative z-10 flex items-center gap-4">
          <span className={`${isActive ? "text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]" : ""}`}>
            {React.cloneElement(icon, { size: 20 })}
          </span>
          {!collapsed && <span className="text-sm font-bold tracking-tight">{label}</span>}
        </div>
        {!collapsed && badge && (
          <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black ${badge === 'NEW' ? 'bg-indigo-600' : 'bg-cyan-500 text-black'}`}>
            {badge}
          </span>
        )}
      </div>
      <AnimatePresence>
        {isOpen && !collapsed && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="ml-9 border-l border-white/10 overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SubItem({ label }) {
  return (
    <div className="py-2.5 px-4 text-[10px] font-bold text-slate-500 hover:text-cyan-400 cursor-pointer transition-all">
      {label}
    </div>
  );
}