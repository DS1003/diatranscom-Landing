import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Arrière-plan décoratif */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/8 rounded-full blur-2xl animate-pulse-slow animation-delay-1000"></div>
        </div>
        
        {/* Logo avec animation subtile */}
        <img
          src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1747407214/Logo_Master_1_mxvijk.png"
          alt="Logo DIA TRANSCOM"
          className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] object-contain relative z-10 animate-float"
          style={{ filter: "drop-shadow(0 8px 32px rgba(245, 158, 11, 0.15))" }}
        />

        {/* Indicateur de chargement moderne */}
        <div className="relative mb-8">
          <div className="flex space-x-3">
            <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-bounce-wave"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-bounce-wave animation-delay-200"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-bounce-wave animation-delay-400"></div>
          </div>
        </div>

        {/* Texte élégant */}
        <div className="text-center">
          <p className="text-slate-600 text-base font-medium tracking-wider mb-2">
            DIA TRANSCOM
          </p>
          <p className="text-slate-400 text-sm font-light tracking-wide">
            Chargement en cours...
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(1deg); }
          50% { transform: translateY(-4px) rotate(0deg); }
          75% { transform: translateY(-8px) rotate(-1deg); }
        }
        
        @keyframes bounce-wave {
          0%, 80%, 100% { 
            opacity: 0.4; 
            transform: translateY(0) scale(1); 
          }
          40% { 
            opacity: 1; 
            transform: translateY(-12px) scale(1.1); 
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-wave {
          animation: bounce-wave 1.8s infinite ease-in-out;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite ease-in-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite ease-in-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Loader;