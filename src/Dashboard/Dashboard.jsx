// src/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    courses: 0,
    events: 0,
    preInscriptions: 0,
  });

  useEffect(() => {
    // Appel API pour récupérer les stats
    fetch("https://backendwnr2-1.onrender.com/api/dashboard-stats")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          courses: data.courses || 0,
          events: data.events || 0,
          preInscriptions: data.preInscriptions || 0,
        });
      })
      .catch((err) => console.error("Erreur fetch stats:", err));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-orange-400 text-white rounded shadow-lg">
          Cours: {stats.courses}
        </div>
        <div className="p-6 bg-orange-500 text-white rounded shadow-lg">
          Événements: {stats.events}
        </div>
        <div className="p-6 bg-orange-600 text-white rounded shadow-lg">
          Pré-inscriptions: {stats.preInscriptions}
        </div>
      </div>
    </div>
  );
}
