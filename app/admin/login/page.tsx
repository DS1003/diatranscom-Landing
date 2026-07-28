import { LoginForm } from "@/components/admin/login-form";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "reicon-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090D14] text-white p-4 relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] rounded-full bg-accent-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      
      {/* Grid pattern overlay for techy aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Back to site link */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 rounded-full text-sm text-gray-300 hover:text-white transition-all backdrop-blur-md shadow-md"
        >
          <ArrowLeft size={16} />
          Retour au site
        </Link>
      </div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative z-10">
        {/* Subtle top edge highlighting */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="p-8 md:p-10">
          <div className="text-center mb-8 flex flex-col items-center">
            {/* Logo Wrapper */}
            <div className="bg-white/95 px-5 py-2.5 rounded-2xl shadow-lg border border-white/25 mb-6 transition-transform duration-300 hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Diatranscom Logo" 
                width={200} 
                height={50} 
                className="h-9 w-auto object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Espace Administration</h1>
            <p className="text-sm text-gray-400 mt-2">Connectez-vous pour gérer votre contenu</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
