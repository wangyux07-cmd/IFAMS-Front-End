import React, { useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AppShell, Icon } from '../components/UI';

const BookkeepingScreen = () => {
    const navigate = useNavigate();
    const [timeframe, setTimeframe] = useState('1m');
    const context = useContext(AppContext);
    
    if (!context) return null;
    const { activities } = context;

    // Calculate base spending from current activities list
    const currentListTotal = activities.reduce((acc, curr) => acc + parseFloat(curr.amount || '0'), 0);

    const totalSpending = useMemo(() => {
        // Mocking historical data accumulation for demo purposes
        switch(timeframe) {
            case '1d': return currentListTotal;
            case '1w': return currentListTotal * 4.5 + 120; // Simulating week total
            case '1m': return currentListTotal * 18 + 450;  // Simulating month total
            case '1y': return currentListTotal * 150 + 2000; // Simulating year total
            case 'all': return currentListTotal * 300 + 5000;
            default: return currentListTotal;
        }
    }, [timeframe, currentListTotal]);

    const spendingPath = useMemo(() => {
        // Generate a smoother, organic curve
        const points = 20; // Increased points for smoothness
        const width = 500; // Wider coordinate system
        const height = 150;
        const seed = timeframe.length * 100 + (timeframe === '1m' ? 50 : 0); 
        
        // Base curve logic
        const coords = Array.from({ length: points }, (_, i) => {
            const x = (i / (points - 1)) * width;
            // Create a "spending pattern" wave
            const wave1 = Math.sin(i * 0.5 + seed) * 20;
            const wave2 = Math.cos(i * 0.8) * 15;
            // Trend usually goes up slightly or fluctuates around a mean
            const y = (height / 2) - (wave1 + wave2); 
            return `${x},${y}`;
        });

        // Bezier curve smoothing
        let d = `M ${coords[0]}`;
        for (let i = 1; i < coords.length; i++) {
            const [x0, y0] = coords[i - 1].split(',').map(Number);
            const [x1, y1] = coords[i].split(',').map(Number);
            const cp1x = x0 + (x1 - x0) * 0.5;
            const cp1y = y0;
            const cp2x = x1 - (x1 - x0) * 0.5;
            const cp2y = y1;
            d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x1},${y1}`;
        }
        return d;
    }, [timeframe]);

    return (
        <AppShell>
             {/* 1. Ambient Background (Cold Aurora for Analytics feel) */}
             <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -right-[10%] w-[120%] h-[60%] rounded-full bg-gradient-radial from-cyan-500/10 to-transparent opacity-40 blur-[100px] animate-fade-in"></div>
                <div className="absolute top-[20%] -left-[20%] w-[100%] h-[50%] rounded-full bg-gradient-radial from-blue-600/10 to-transparent opacity-30 blur-[120px] animate-fade-in delay-75"></div>
            </div>

            {/* Main Layout: Full Viewport Height Flex Container */}
            <div className="flex flex-col h-[100dvh] relative z-10">
                
                {/* Header - Centered Title */}
                <header className="px-6 pt-12 pb-2 flex items-center justify-center flex-shrink-0">
                    <div className="text-center">
                         <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">Cash Flow</span>
                    </div>
                </header>
                
                {/* 2. HERO: Amount & Chart (Fixed Height Area) */}
                <div className="flex-shrink-0 flex flex-col items-center pt-2 pb-6 relative">
                    
                    {/* Timeframe Pills - Floating */}
                    <div className="flex bg-white/5 p-1 rounded-full backdrop-blur-md border border-white/10 mb-4 shadow-lg scale-90">
                        {['1d', '1w', '1m', '1y'].map(t => (
                            <button 
                                key={t} 
                                onClick={() => setTimeframe(t)} 
                                className={`
                                    text-[9px] font-bold px-4 py-1.5 rounded-full transition-all uppercase tracking-wider
                                    ${t === timeframe 
                                        ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="text-center space-y-1 relative z-10">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest opacity-80">Total Outflow</p>
                        <h1 className="text-[56px] font-medium text-white tracking-tighter leading-none drop-shadow-2xl">
                            <span className="text-3xl font-light text-cyan-500/50 align-top mr-1">$</span>
                            {totalSpending.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </h1>
                    </div>

                    {/* Glowing Chart Underlay */}
                    <div className="w-full h-24 mt-4 relative overflow-hidden">
                        {/* Gradient Fade Overlay at bottom to blend with Glass Panel */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-dark/20 z-10"></div>
                        
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3"/>
                                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            {/* Fill Area */}
                            <path 
                                d={`${spendingPath} L 500,150 L 0,150 Z`} 
                                fill="url(#chartGlow)" 
                                className="transition-all duration-700 ease-in-out"
                            />
                            {/* Stroke Line */}
                            <path 
                                d={spendingPath} 
                                fill="none" 
                                stroke="#22d3ee" 
                                strokeWidth="3" 
                                strokeLinecap="round" 
                                filter="url(#glow)"
                                className="transition-all duration-700 ease-in-out"
                            />
                        </svg>
                    </div>
                </div>

                {/* 3. FROSTED CONSOLE: Activity List (Fills remaining height) */}
                <div className="flex-1 bg-card-dark/80 backdrop-blur-2xl rounded-t-[40px] border-t border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col animate-fade-in-up">
                    
                    {/* Console Header */}
                    <div className="px-8 pt-6 pb-4 flex justify-between items-center bg-gradient-to-b from-white/[0.02] to-transparent flex-shrink-0">
                        <div className="flex items-center gap-2">
                             <div className="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse"></div>
                             <h3 className="text-sm font-bold text-white uppercase tracking-widest">Transactions</h3>
                        </div>
                        <button 
                            onClick={() => navigate('/add-expense')}
                            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all active:scale-95"
                        >
                            <span className="text-[10px] font-bold text-gray-300 group-hover:text-cyan-400 uppercase tracking-wider transition-colors">Add New</span>
                            <div className="size-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                                <Icon name="add" className="text-xs font-bold" />
                            </div>
                        </button>
                    </div>

                    {/* Scrollable List - Added pb-28 to clear bottom nav */}
                    <div className="flex-1 overflow-y-auto px-6 pb-28 hide-scrollbar space-y-3">
                        {activities.map((act) => (
                            <div key={act.id} className="group relative overflow-hidden flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer">
                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                <div className="relative z-10 size-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform">
                                    <Icon name={act.icon} className="text-cyan-200" />
                                </div>
                                
                                <div className="relative z-10 flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-white truncate group-hover:text-cyan-100 transition-colors">{act.title}</h4>
                                    <p className="text-[11px] text-gray-500 font-medium tracking-wide flex items-center gap-1.5 mt-0.5">
                                        <span className="truncate max-w-[100px]">{act.category}</span>
                                        <span className="size-0.5 rounded-full bg-gray-600"></span>
                                        <span>{act.time}</span>
                                    </p>
                                </div>
                                
                                <div className="relative z-10 text-right">
                                    <p className="text-sm font-black text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all">
                                        -${act.amount}
                                    </p>
                                    <Icon name="chevron_right" className="text-gray-600 text-xs mt-1 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        ))}
                        
                        {/* Empty State Spacer */}
                        <div className="h-4"></div>
                        <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest opacity-50 font-bold">End of List</p>
                    </div>
                </div>
            </div>
        </AppShell>
    );
};

export default BookkeepingScreen;