import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AppShell, Icon } from '../components/UI';

const ProfileScreen = () => {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const [showAvatarMenu, setShowAvatarMenu] = useState(false);
    
    if (!context) return null;
    const { username, userAvatar, setUserAvatar, totalNetWorth, financialScore } = context;

    // Simulate updating avatar
    const handleUpdateAvatar = () => {
        const newAvatar = `https://picsum.photos/seed/${Date.now()}/200/200`;
        setUserAvatar(newAvatar);
        setShowAvatarMenu(false);
    };

    // Updated Menu Items
    const menuItems = [
        { title: 'Settings & Security', subtitle: 'Biometrics, App Preferences', icon: 'settings_suggest', path: '/settings' },
        { title: 'AI Concierge', subtitle: 'Portfolio Insights & Chat', icon: 'smart_toy', path: '/ai-concierge' },
    ];

    return (
        <AppShell>
            {/* 1. Enhanced Ambient Background - Deeper, richer gradients with Noise Texture */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden bg-[#050B08]">
                 <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[60%] rounded-full bg-gradient-radial from-brand-emerald/10 via-cyan-900/10 to-transparent opacity-40 blur-[120px] animate-pulse"></div>
                 <div className="absolute bottom-[-20%] right-[-10%] w-[100%] h-[80%] rounded-full bg-gradient-radial from-blue-900/10 via-purple-900/5 to-transparent opacity-30 blur-[100px]"></div>
                 {/* Noise texture overlay for premium feel */}
                 <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
            </div>

            <div className="relative z-10 flex flex-col h-full px-6 pt-12 pb-24">
                
                {/* 2. Header / Title - Pill Style */}
                <header className="flex justify-center mb-8 animate-fade-in">
                     <div className="px-5 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md shadow-lg">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">Executive Profile</span>
                     </div>
                </header>

                {/* 3. Hero User Card */}
                <div className="flex flex-col items-center mb-12 animate-fade-in delay-75">
                    {/* Avatar with Complex Ring Animation */}
                    <div className="relative group mb-6">
                        {/* Outer Glow Rings */}
                        <div className="absolute inset-0 rounded-full border border-brand-emerald/30 scale-110 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
                        <div className="absolute inset-0 rounded-full border border-cyan-400/20 scale-125 opacity-0 group-hover:scale-150 group-hover:opacity-50 transition-all duration-1000 delay-75 ease-out"></div>
                        
                        <button 
                            onClick={() => setShowAvatarMenu(true)}
                            className="relative block rounded-full p-1 bg-gradient-to-tr from-brand-emerald via-cyan-500 to-transparent shadow-2xl shadow-brand-emerald/20 active:scale-95 transition-transform duration-300"
                        >
                            <div className="size-32 rounded-full bg-[#050B08] p-1.5">
                                <div className="size-full rounded-full bg-cover bg-center border border-white/10" style={{backgroundImage: `url("${userAvatar}")`}}></div>
                            </div>
                            
                            {/* Edit Badge */}
                            <div className="absolute bottom-1 right-1 size-9 rounded-full bg-[#15201B] border border-white/10 flex items-center justify-center text-white shadow-lg group-hover:bg-brand-emerald group-hover:text-black transition-colors duration-300">
                                <Icon name="edit" className="text-sm" />
                            </div>
                        </button>
                    </div>

                    <h2 className="text-3xl font-black text-white tracking-tight mb-2 drop-shadow-md">{username}</h2>
                    
                    <div className="flex items-center gap-2 mb-8">
                        <div className="px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 flex items-center gap-1.5 backdrop-blur-sm">
                            <div className="size-1.5 rounded-full bg-brand-emerald shadow-[0_0_6px_rgba(16,185,129,1)] animate-pulse"></div>
                            <span className="text-[10px] font-bold text-brand-emerald uppercase tracking-widest">Premium Member</span>
                        </div>
                    </div>

                    {/* Stats Glass Panel - Refined */}
                    <div className="flex w-full max-w-[340px] bg-[#0D1A14]/60 border border-white/10 rounded-2xl p-1 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                        {/* Glass Shine Effect */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>

                        <div className="flex-1 flex flex-col items-center py-4 border-r border-white/5 relative cursor-default">
                             <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                             <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 relative z-10">Net Worth</p>
                             <p className="text-lg font-black text-white tracking-tight relative z-10 hover:scale-105 transition-transform duration-300">
                                ${(totalNetWorth / 1000000).toFixed(1)}M
                            </p>
                        </div>
                        <div className="flex-1 flex flex-col items-center py-4 relative cursor-default">
                             <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                             <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 relative z-10">Health Score</p>
                             <div className="relative z-10 hover:scale-105 transition-transform duration-300 flex items-baseline">
                                 <p className={`text-lg font-black ${financialScore > 80 ? 'text-brand-emerald' : 'text-accent-gold'}`}>
                                    {financialScore}
                                </p>
                                <span className="text-[10px] text-gray-600 font-bold ml-0.5">/100</span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* 4. Menu List - More Interactive */}
                <div className="flex-1 space-y-4 animate-fade-in delay-150">
                    {menuItems.map((item, i) => (
                        <div 
                            key={i} 
                            onClick={() => navigate(item.path)}
                            className="group relative overflow-hidden flex items-center gap-5 p-5 rounded-[20px] bg-[#0D1A14]/40 border border-white/5 hover:bg-white/[0.03] hover:border-brand-emerald/20 active:scale-[0.98] transition-all duration-300 cursor-pointer backdrop-blur-lg shadow-lg"
                        >
                             {/* Hover Gradient Background Slide */}
                             <div className="absolute inset-0 bg-gradient-to-r from-brand-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                             
                             {/* Icon Box */}
                            <div className="relative z-10 size-12 rounded-xl bg-[#1A2621] border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-brand-emerald group-hover:border-brand-emerald/30 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300">
                                <Icon name={item.icon} className="text-2xl" />
                            </div>
                            
                            <div className="relative z-10 flex-1">
                                <h4 className="text-base font-bold text-white group-hover:text-brand-emerald/90 transition-colors duration-300">{item.title}</h4>
                                <p className="text-xs text-gray-500 font-medium tracking-wide mt-0.5 group-hover:text-gray-400 transition-colors">{item.subtitle}</p>
                            </div>
                            
                            {/* Arrow Animation */}
                            <div className="relative z-10 size-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                <Icon name="arrow_forward" className="text-white text-xs" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* 5. Sign Out */}
                <button 
                    onClick={() => navigate('/')} 
                    className="mt-8 w-full h-14 flex items-center justify-center gap-2 rounded-2xl border border-rose-500/10 bg-rose-500/5 text-rose-500/80 font-bold uppercase tracking-widest text-xs hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.1)] active:scale-[0.98] transition-all duration-300"
                >
                    <Icon name="logout" className="text-base" />
                    <span>Sign Out</span>
                </button>
            </div>

            {/* Avatar Selection Modal */}
            {showAvatarMenu && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-md animate-fade-in" onClick={() => setShowAvatarMenu(false)}>
                    <div className="w-full max-w-[430px] p-4 animate-fade-in-up" onClick={e => e.stopPropagation()}>
                        <div className="bg-[#15201B] rounded-[32px] border border-white/10 overflow-hidden shadow-2xl ring-1 ring-white/5">
                            <div className="p-6 pb-2 text-center">
                                <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-4"></div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Update Profile Photo</h3>
                            </div>
                            
                            <div className="p-4 space-y-3">
                                <button onClick={handleUpdateAvatar} className="w-full h-16 rounded-2xl bg-white/5 hover:bg-brand-emerald/10 border border-white/5 hover:border-brand-emerald/30 flex items-center justify-center gap-3 text-white transition-all duration-300 group">
                                    <div className="size-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-black transition-colors">
                                        <Icon name="photo_camera" className="text-gray-400 group-hover:text-black text-sm" />
                                    </div>
                                    <span className="text-sm font-bold">Take Photo</span>
                                </button>
                                <button onClick={handleUpdateAvatar} className="w-full h-16 rounded-2xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 flex items-center justify-center gap-3 text-white transition-all duration-300 group">
                                    <div className="size-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                                        <Icon name="photo_library" className="text-gray-400 group-hover:text-black text-sm" />
                                    </div>
                                    <span className="text-sm font-bold">Choose from Library</span>
                                </button>
                            </div>
                            
                            <div className="p-4 pt-0">
                                <button 
                                    onClick={() => setShowAvatarMenu(false)}
                                    className="w-full h-14 rounded-2xl bg-transparent hover:bg-white/5 text-gray-500 font-bold text-sm transition-colors uppercase tracking-wider"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppShell>
    );
};

export default ProfileScreen;