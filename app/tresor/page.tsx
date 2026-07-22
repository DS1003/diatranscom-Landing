import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TresorPage() {
  const articles = [
    {
      title: "L'Avenir de l'Assainissement Urbain à Dakar",
      date: "12 Juillet 2026",
      category: "Innovation",
      desc: "Comment les nouvelles technologies de drainage permettent d'anticiper les défis climatiques dans les zones urbaines denses."
    },
    {
      title: "Techniques Avancées de Terrassement en Milieu Roches",
      date: "05 Juin 2026",
      category: "Expertise",
      desc: "Une plongée technique dans les méthodologies utilisées par nos ingénieurs pour le nivellement de terrains complexes."
    },
    {
      title: "Infrastructures Durables : La Vision 2030",
      date: "28 Mai 2026",
      category: "Vision",
      desc: "Les engagements de Diatranscom pour des chantiers plus respectueux de l'environnement et de l'empreinte carbone."
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-primary-950">
      <div className="bg-primary-950 py-32 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent opacity-50" />
        <h1 className="text-5xl md:text-7xl font-black mb-6">Le Blog / Trésor</h1>
        <p className="text-xl text-primary-300 max-w-2xl mx-auto">Expertise, actualités et insights techniques de nos ingénieurs.</p>
      </div>
      
      <div className="container mx-auto px-6 lg:px-16 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <Card key={i} className="bg-white/5 border-white/10 hover:-translate-y-2 transition-transform duration-500">
              <CardHeader>
                <div className="text-accent-500 text-xs font-bold tracking-widest uppercase mb-4">{article.category}</div>
                <CardTitle className="text-2xl text-white leading-snug">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-300 mb-8">{article.desc}</p>
                <div className="text-sm text-primary-500 font-medium">{article.date}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
