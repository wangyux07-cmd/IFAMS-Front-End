import React, { useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AppShell, Icon } from '../components/UI';
import { Assets } from '../types';

const DashboardScreen = () => {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    
    if (!context) return null;
    const { username, userAvatar, totalNetWorth, assets, financialScore, growthMetrics } = context;

    // Simplified to just USD as per request to remove selector
    const currentCurrency = { code: 'USD', symbol: '$', rate: 1 };
    
    const portfolioValue = (totalNetWorth * currentCurrency.rate).toLocaleString(undefined, { maximumFractionDigits: 0 });

    // Calculate dynamic "Next Distribution" date (Next Month 15th)
    const nextDistDate = useMemo(() => {
        const d = new Date();
        d.setMonth(d.getMonth() + 1);
        d.setDate(15);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }, []);

    // Format Growth numbers based on selected currency
    const growthAmountDisplay = (Math.abs(growthMetrics.amount) * currentCurrency.rate).toLocaleString(undefined, { maximumFractionDigits: 0 });
    const growthColorClass = growthMetrics.isPositive ? 'text-brand-emerald' : 'text-rose-500';
    // refined background for growth pill
    const growthBgClass = growthMetrics.isPositive ? 'bg-brand-emerald/10 border border-brand-emerald/20' : 'bg-rose-500/10 border border-rose-500/20';
    const growthIcon = growthMetrics.isPositive ? 'trending_up' : 'trending_down';

    // Harmonious "Emerald & Gold" Palette
    const assetConfig = [
        { key: 'equities', label: 'Equities', colorHex: '#10B981', bgClass: 'bg-[#10B981]' },    // Emerald-500
        { key: 'fixedIncome', label: 'Fixed Inc.', colorHex: '#6EE7B7', bgClass: 'bg-[#6EE7B7]' }, // Emerald-300
        { key: 'insurance', label: 'Insurance', colorHex: '#2DD4BF', bgClass: 'bg-[#2DD4BF]' },    // Teal-400
        { key: 'fx', label: 'FX Holdings', colorHex: '#A3E635', bgClass: 'bg-[#A3E635]' },        // Lime-400 (Bridge)
        { key: 'cash', label: 'Cash', colorHex: '#FCD34D', bgClass: 'bg-[#FCD34D]' },             // Amber-300 (Light Gold)
        { key: 'liabilities', label: 'Liabilities', colorHex: '#D97706', bgClass: 'bg-[#D97706]' } // Amber-600 (Dark Gold)
    ];

    const { assetData, gradientStyle } = useMemo(() => {
        const totalAllocationValue = Object.values(assets).reduce((a, b) => a + b, 0);
        let currentGradientPercentage = 0;
        
        const data = assetConfig.map(item => {
            const val = assets[item.key as keyof Assets] || 0;
            const percentage = totalAllocationValue > 0 ? (val / totalAllocationValue) * 100 : 0;
            const labelPct = Math.round(percentage) + '%';
            
            // For Semi Donut (0-50%)
            const share = totalAllocationValue > 0 ? val / totalAllocationValue : 0;
            const start = currentGradientPercentage;
            const end = currentGradientPercentage + (share * 50); // Map 0-100% of data to 0-50% of circle
            currentGradientPercentage = end;

            return { ...item, percentageStr: labelPct, gradientStop: `${item.colorHex} ${start}% ${end}%` };
        });

        // Add the hiding part of the donut (bottom half)
        const stops = data.map(d => d.gradientStop);
        stops.push(`#0D1A14 ${currentGradientPercentage}% 100%`);

        return {
            assetData: data,
            gradientStyle: {
                background: `conic-gradient(from 270deg at 50% 100%, ${stops.join(', ')})`
            }
        };
    }, [assets]);

    return (
        <AppShell>
            {/* Header: More airy with slightly adjusted padding */}
            <header className="flex items-center justify-between px-6 pt-12 pb-2 sticky top-0 z-40 bg-background-dark/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-3.5">
                    <div onClick={() => navigate('/profile')} className="size-[42px] rounded-full bg-gradient-to-tr from-accent-gold via-white/20 to-brand-emerald/50 p-[2px] cursor-pointer active:scale-95 transition-transform shadow-lg shadow-black/40">
                        <div className="h-full w-full rounded-full bg-background-dark bg-center bg-cover" style={{backgroundImage: `url("${userAvatar}")`}}></div>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Portfolio Overview</p>
                        <h2 className="text-xl font-bold leading-none text-white tracking-tight">Hello, {username}</h2>
                    </div>
                </div>
                {/* Removed Settings Button as requested */}
            </header>

            <div className="px-5 pb-36 space-y-5 pt-5">
                
                {/* Hero Card: Added subtle gradient and better spacing */}
                <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-b from-[#15231D] to-[#0D1A14] p-7 shadow-2xl border border-white/5 group">
                    {/* Decorative background glow */}
                    <div className="absolute -top-10 -right-10 size-40 bg-brand-emerald/5 rounded-full blur-3xl group-hover:bg-brand-emerald/10 transition-colors duration-700"></div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-[11px] font-bold tracking-[0.2em] text-brand-emerald uppercase opacity-90">Net Worth</p>
                            <div className={`flex items-center gap-1.5 rounded-full ${growthBgClass} px-2.5 py-1 backdrop-blur-sm`}>
                                <Icon name={growthIcon} className={`text-sm ${growthColorClass}`} />
                                <span className={`text-[11px] font-black ${growthColorClass}`}>{Math.abs(growthMetrics.percent).toFixed(1)}%</span>
                            </div>
                        </div>
                        
                        <p className="text-[44px] font-extrabold leading-none tracking-tighter text-white drop-shadow-sm my-3">
                            <span className="text-2xl font-light text-gray-400 mr-1 align-top mt-2 inline-block">{currentCurrency.symbol}</span>
                            {portfolioValue}
                        </p>

                        <div className="flex items-center gap-2 mb-6">
                             <p className="text-sm font-medium text-gray-400 flex items-center gap-1">
                                {growthMetrics.isPositive ? '+' : '-'}{currentCurrency.symbol}{growthAmountDisplay}
                                <span className="text-xs opacity-60 ml-0.5">past month</span>
                            </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                            <div>
                                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">YTD Return</p>
                                <p className={`text-sm font-bold text-brand-emerald`}>+18.4%</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Next Distribution</p>
                                <div className="flex items-center justify-end gap-1.5 text-white">
                                    <Icon name="event" className="text-sm text-brand-emerald" />
                                    <p className="text-sm font-bold">{nextDistDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Allocation Card: Improved Grid and Chart container */}
                <div className="rounded-[20px] bg-card-dark p-6 border border-white/5 shadow-lg relative">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-base font-bold text-white tracking-wide">Allocation</h2>
                        <button onClick={() => navigate('/overview')} className="text-[10px] font-bold text-brand-emerald uppercase tracking-wider hover:text-emerald-400 transition-colors">View Analysis</button>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center pb-8 relative">
                        {/* Glow behind chart */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 bg-brand-emerald/5 rounded-full blur-2xl"></div>
                        <div className="semi-donut z-10" style={gradientStyle}></div>
                        <div className="-mt-9 text-center z-10">
                            <p className="font-extrabold text-white leading-none">
                                <span className="text-3xl tracking-tighter">{assetData.length}</span>
                            </p>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold mt-1">Classes</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/5">
                        {assetData.map((asset, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => navigate(`/asset-detail/${asset.key}`)}
                                className="flex flex-col items-center justify-center p-3 rounded-xl transition-all hover:bg-white/[0.03] active:scale-95 group border border-transparent hover:border-white/5"
                            >
                                <div className="flex items-center gap-1.5 mb-2">
                                    <div className={`size-2 rounded-full ${asset.bgClass} shadow-sm`}></div>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight group-hover:text-white transition-colors">{asset.label}</span>
                                </div>
                                <span className="text-sm font-bold text-white">{asset.percentageStr}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* AI Insights: More refined layout */}
                <div onClick={() => navigate('/health')} className="group rounded-[20px] bg-gradient-to-r from-card-dark to-[#101F18] p-1 shadow-lg border border-white/5 cursor-pointer active:scale-[0.98] transition-all">
                    <div className="flex items-center justify-between p-4 rounded-[18px] bg-background-dark/50 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="relative flex flex-shrink-0 items-center justify-center size-14">
                                <svg className="size-full -rotate-90 transform group-hover:scale-105 transition-transform duration-500" viewBox="0 0 80 80">
                                    <circle cx="40" cy="40" fill="transparent" r="36" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="5"></circle>
                                    <circle cx="40" cy="40" fill="transparent" r="36" stroke="#10B981" strokeDasharray="226" strokeDashoffset={226 - (226 * financialScore / 100)} strokeLinecap="round" strokeWidth="5"></circle>
                                </svg>
                                <div className="absolute text-center">
                                    <p className="text-sm font-black text-white">{financialScore}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-brand-emerald uppercase tracking-wider mb-0.5">AI Insights</p>
                                <p className="text-sm font-bold text-white">Portfolio Health is {financialScore > 85 ? 'Excellent' : 'Good'}</p>
                            </div>
                        </div>
                        <div className="size-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                            <Icon name="chevron_right" className="text-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Button: Enhanced Shadow */}
            <div className="fixed bottom-28 right-6 z-50">
                <Link to="/ai-concierge" className="ai-pulse-glow flex size-14 items-center justify-center rounded-full bg-brand-emerald text-white transition-all hover:scale-110 hover:-translate-y-1 active:scale-95 shadow-xl shadow-brand-emerald/30 border border-white/10">
                    <Icon name="smart_toy" className="text-[26px] font-bold" />
                </Link>
            </div>
        </AppShell>
    );
};

export default DashboardScreen;