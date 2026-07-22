import { LoginForm } from "@/components/admin/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
            <p className="text-sm text-gray-500 mt-2">Connectez-vous à votre espace Diatranscom</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
