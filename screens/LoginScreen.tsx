import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/UI';

const LoginScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="relative flex h-screen w-full flex-col bg-background-dark overflow-hidden font-publicSans">
            <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-[480px] mx-auto w-full z-10">
                <div className="mb-8">
                    <div className="w-16 h-16 bg-brand-emerald rounded-xl flex items-center justify-center shadow-lg shadow-black/20 ring-1 ring-white/10">
                        <Icon name="account_balance_wallet" className="text-white text-4xl font-light" />
                    </div>
                </div>
                <h1 className="text-brand-emerald tracking-tight text-[32px] font-bold leading-tight text-center">Secure Access</h1>
                <p className="text-white/60 text-base font-normal leading-normal mt-2 mb-10 text-center">Authentication required</p>
                <div className="w-full space-y-4">
                    <input className="flex w-full rounded-xl text-white border border-white/10 bg-white/5 h-14 p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand-emerald/50" placeholder="name@exclusive.com" type="email"/>
                    <input className="flex w-full rounded-xl text-white border border-white/10 bg-white/5 h-14 p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand-emerald/50" placeholder="••••••••" type="password"/>
                    <button onClick={() => navigate('/dashboard')} className="w-full h-14 bg-brand-emerald text-white font-semibold text-lg rounded-xl shadow-lg active:scale-[0.98] transition-all mt-4 hover:bg-brand-emerald/90">
                        Sign In
                    </button>
                </div>
                <button onClick={() => navigate('/dashboard')} className="mt-12 flex flex-col items-center group">
                    <div className="size-16 rounded-full border border-brand-emerald/20 flex items-center justify-center bg-white/5 group-hover:bg-brand-emerald/10 transition-colors">
                        <Icon name="face" className="text-brand-emerald text-4xl" />
                    </div>
                    <p className="text-white/50 text-xs mt-3">Face ID Sign-in</p>
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;
