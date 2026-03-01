import { useState } from "react";

export default function Dashboard() {
  const [logged, setLogged] = useState(true);

  function handleLogout() {
    localStorage.removeItem("aur_session");
    localStorage.removeItem("sequence");
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-yellow-400/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-yellow-400">
              AUR EDENTECH
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "TOTALITÀ", icon: "◎" },
            { title: "FORUM", icon: "◬" },
            { title: "PROFILO", icon: "◯" },
            { title: "VIAGGIO", icon: "◆" },
            { title: "WALLET", icon: "Ⓞ" },
            { title: "PREMI", icon: "★" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg bg-gradient-to-br from-yellow-400/10 to-black border border-yellow-400/20 hover:border-yellow-400/50 transition cursor-pointer group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-yellow-400/30 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-white/50 text-sm">
          AUR EDENTECH Platform • Powered by Supabase • {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
