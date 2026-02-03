import React, { useEffect, useState } from 'react';

const Loader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 40);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-slate-950 z-[9999] flex flex-col items-center justify-center overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 text-center">
                {/* Animated Building Icon */}
                <div className="mb-12 relative inline-block">
                    <svg className="w-24 h-24 text-amber-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                    </svg>
                    <div className="absolute -inset-4 border border-amber-400/20 rounded-full animate-[spin_4s_linear_infinite]"></div>
                    <div className="absolute -inset-8 border border-blue-400/10 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                </div>

                <h2 className="text-3xl font-black text-white mb-2 tracking-[0.2em]">DIATRANSCOM</h2>
                <p className="text-blue-400/60 font-medium uppercase tracking-widest text-xs mb-12">Chargement de l'excellence...</p>

                {/* Progress bar container */}
                <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
                    <div
                        className="h-full bg-gradient-to-r from-blue-600 via-amber-400 to-blue-600 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Percentage indicator */}
                <div className="mt-4 text-white/40 font-mono text-sm">
                    {progress}%
                </div>
            </div>

            {/* Construction particles */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-400 rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random(),
                        animation: `float ${3 + Math.random() * 4}s linear infinite`
                    }}
                ></div>
            ))}

            <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default Loader;
