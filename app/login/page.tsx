import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="pt-24 min-h-screen bg-primary-950 flex items-center justify-center py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-md relative z-10">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
          <CardHeader className="text-center pb-8">
            <div className="mb-6 flex justify-center">
              <span className="text-3xl font-black tracking-tighter text-white">
                DIATRANSCOM<span className="text-accent-500">.</span>
              </span>
            </div>
            <CardTitle className="text-2xl text-white">Bienvenue</CardTitle>
            <p className="text-primary-300 mt-2 text-sm">Connectez-vous à votre espace partenaire</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary-300">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors" 
                  placeholder="nom@entreprise.com"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-primary-300">Mot de passe</label>
                  <Link href="#" className="text-xs text-accent-500 hover:text-accent-400">Mot de passe oublié ?</Link>
                </div>
                <input 
                  type="password" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors" 
                  placeholder="••••••••"
                />
              </div>
              
              <Button variant="accent" className="w-full py-6 text-base rounded-xl mt-4">
                Se Connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
