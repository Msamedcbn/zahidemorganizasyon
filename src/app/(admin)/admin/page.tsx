"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FluidShapes } from "@/components/ui/FluidShapes";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Giriş başarısız!");
        setLoading(false);
        return;
      }

      const data = await res.json();
      document.cookie = `session=${data.token}; path=/; max-age=86400; samesite=lax${window.location.protocol === "https:" ? "; secure" : ""}`;
      router.push("/admin/dashboard");
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-md mx-auto px-6">
        <div className="glass-card !p-8 md:!p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-headline font-bold text-primary mb-2">
              Zahidem Organizasyon
            </h1>
            <p className="text-sm text-muted">Yönetim Paneli</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none transition-colors text-sm"
                placeholder="admin@zahidemorganizasyon.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <p className="text-center text-xs text-muted mt-6">
            &copy; {new Date().getFullYear()} Zahidem Organizasyon - Yönetim Paneli
          </p>
        </div>
      </div>
      <FluidShapes />
    </div>
  );
}
