"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader, Envelope, Lock, Eye, EyeClosed } from "reicon-react";
import { Button } from "@/components/ui/button";
import { authenticate } from "@/actions/auth-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    const result = await authenticate(data.email, data.password);
    setIsLoading(false);

    if (result?.error) {
      toast.error("Identifiants incorrects");
    } else {
      toast.success("Connexion réussie");
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Email</label>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent-500 transition-colors">
            <Envelope size={18} />
          </span>
          <input
            {...register("email")}
            type="email"
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 hover:border-white/20 focus:border-accent-500 rounded-xl focus:ring-4 focus:ring-accent-500/10 outline-none text-white transition-all placeholder:text-gray-600 text-sm font-medium"
            placeholder="ex: admin@diatranscom.com"
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Mot de passe</label>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent-500 transition-colors">
            <Lock size={18} />
          </span>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 hover:border-white/20 focus:border-accent-500 rounded-xl focus:ring-4 focus:ring-accent-500/10 outline-none text-white transition-all placeholder:text-gray-600 text-sm font-medium"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-accent-500 hover:bg-accent-400 text-primary-950 font-bold rounded-xl transition-all shadow-lg shadow-accent-500/10 hover:shadow-accent-500/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {isLoading ? <Loader size={16} className="animate-spin" /> : null}
        Se connecter
      </button>
    </form>
  );
};
