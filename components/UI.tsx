import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Icon = ({ name, className = "" }: { name: string; className?: string }) => (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

export const AppShell = ({ children, hideNav = false }: { children?: React.ReactNode; hideNav?: boolean }) => {
    const location = useLocation();
    
    return (
        <div className="relative mx-auto min-h-screen max-w-[430px] overflow-x-hidden shadow-2xl bg-background-dark flex flex-col">
            <div className="flex-1">
                {children}
            </div>
            
            {!hideNav && (
                <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[430px] border-t border-white/10 bg-[#0F1613]/90 px-2 pb-8 pt-4 backdrop-blur-xl">
                    <div className="flex items-center justify-between px-2">
                        <Link to="/dashboard" className={`flex flex-col items-center gap-1.5 flex-1 group ${location.pathname === '/dashboard' ? 'text-brand-emerald' : 'text-gray-500'}`}>
                            <Icon name="dashboard" className={`text-[26px] transition-transform duration-300 group-hover:-translate-y-1 ${location.pathname === '/dashboard' ? 'scale-110' : ''}`} />
                            <span className={`text-[9px] font-bold uppercase tracking-wider transition-opacity ${location.pathname === '/dashboard' ? 'opacity-100' : 'opacity-60'}`}>Dashboard</span>
                        </Link>
                        
                        <Link to="/overview" className={`flex flex-col items-center gap-1.5 flex-1 group ${location.pathname === '/overview' ? 'text-brand-emerald' : 'text-gray-500'}`}>
                            <Icon name="analytics" className={`text-[26px] transition-transform duration-300 group-hover:-translate-y-1 ${location.pathname === '/overview' ? 'scale-110' : ''}`} />
                            <span className={`text-[9px] font-bold uppercase tracking-wider transition-opacity ${location.pathname === '/overview' ? 'opacity-100' : 'opacity-60'}`}>Overview</span>
                        </Link>
                        
                        {/* Exquisite Center Button */}
                        <div className="relative -top-5 flex-1 flex justify-center">
                            <Link to="/add-hub" className="group relative">
                                {/* Ambient Glow */}
                                <div className="absolute inset-0 rounded-full bg-brand-emerald/40 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
                                
                                {/* Main Button Structure */}
                                <div className="relative size-16 rounded-full bg-gradient-to-b from-[#10B981] to-[#059669] flex items-center justify-center shadow-[0_8px_16px_rgba(6,95,70,0.4)] border border-white/20 group-active:scale-95 transition-all duration-300 z-10 overflow-hidden">
                                    
                                    {/* Inner Gloss/Highlight */}
                                    <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
                                    
                                    {/* Icon */}
                                    <Icon name="add" className="text-[32px] font-bold text-white drop-shadow-md relative z-10 group-hover:rotate-90 transition-transform duration-300" />
                                </div>
                            </Link>
                        </div>

                        <Link to="/bookkeeping" className={`flex flex-col items-center gap-1.5 flex-1 group ${location.pathname === '/bookkeeping' ? 'text-brand-emerald' : 'text-gray-500'}`}>
                            <Icon name="menu_book" className={`text-[26px] transition-transform duration-300 group-hover:-translate-y-1 ${location.pathname === '/bookkeeping' ? 'scale-110' : ''}`} />
                            <span className={`text-[9px] font-bold uppercase tracking-wider transition-opacity ${location.pathname === '/bookkeeping' ? 'opacity-100' : 'opacity-60'}`}>Ledger</span>
                        </Link>
                        
                        <Link to="/profile" className={`flex flex-col items-center gap-1.5 flex-1 group ${location.pathname === '/profile' ? 'text-brand-emerald' : 'text-gray-500'}`}>
                            <Icon name="person" className={`text-[26px] transition-transform duration-300 group-hover:-translate-y-1 ${location.pathname === '/profile' ? 'scale-110' : ''}`} />
                            <span className={`text-[9px] font-bold uppercase tracking-wider transition-opacity ${location.pathname === '/profile' ? 'opacity-100' : 'opacity-60'}`}>Profile</span>
                        </Link>
                    </div>
                </nav>
            )}
        </div>
    );
};