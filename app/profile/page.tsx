import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <div className="pt-24 min-h-screen bg-primary-950 flex items-center justify-center py-32">
      <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
        <h1 className="text-5xl font-black text-white mb-12 text-center">Mon Profil</h1>
        
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8">
          <CardHeader>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-accent-500 rounded-full flex items-center justify-center text-4xl font-bold text-primary-950">
                JD
              </div>
              <div>
                <CardTitle className="text-3xl text-white mb-2">John Doe</CardTitle>
                <p className="text-primary-300">Directeur de Projet</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm text-primary-400">Email</label>
                <div className="text-white text-lg font-medium">john.doe@example.com</div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-primary-400">Téléphone</label>
                <div className="text-white text-lg font-medium">+221 77 000 00 00</div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-primary-400">Entreprise</label>
                <div className="text-white text-lg font-medium">SN BTP SA</div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 flex justify-end gap-4">
              <Button variant="outline">Modifier le profil</Button>
              <Button variant="accent">Se déconnecter</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
