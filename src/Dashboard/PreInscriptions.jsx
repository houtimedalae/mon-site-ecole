// src/Dashboard/PreInscriptions.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PreInscriptions() {
  const [preinscriptions, setPreinscriptions] = useState([]);
  const [courses, setCourses] = useState([]);

  // Charger préinscriptions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [preRes, coursesRes] = await Promise.all([
          axios.get("https://backendwnr2-1.onrender.com/api/preinscriptions"),
          axios.get("https://backendwnr2-1.onrender.com/api/courses"),
        ]);
        setPreinscriptions(preRes.data);
        setCourses(coursesRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Trouver le nom du cours
  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.title : "Cours inconnu";
  };

  // Valider préinscription
  const handleValidate = async (id) => {
    try {
      await axios.put(`https://backendwnr2-1.onrender.com/api/preinscriptions/${id}`, {
        validated: true, // on marque comme validé
      });
      setPreinscriptions((prev) =>
        prev.map((p) => (p.id === id ? { ...p, validated: true } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Supprimer préinscription
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backendwnr2-1.onrender.com/api/preinscriptions/${id}`);
      setPreinscriptions((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Pré-inscriptions</h1>

      {preinscriptions.length === 0 ? (
        <p>Aucune pré-inscription pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-orange-100">
              <tr>
                <th className="px-4 py-2 border">Nom</th>
                <th className="px-4 py-2 border">Téléphone</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Cours</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {preinscriptions.map((p) => (
                <tr
                  key={p.id}
                  className={`text-center ${
                    p.validated ? "bg-green-50" : ""
                  }`}
                >
                  <td className="px-4 py-2 border">{p.studentName}</td>
                  <td className="px-4 py-2 border">{p.phone}</td>
                  <td className="px-4 py-2 border">{p.email}</td>
                  <td className="px-4 py-2 border">{getCourseName(p.courseId)}</td>
                  <td className="px-4 py-2 border">
                    {p.validated ? "✅ Validée" : "❌ Non validée"}
                  </td>
                  <td className="px-4 py-2 border flex justify-center gap-2">
                    {!p.validated && (
                      <button
                        onClick={() => handleValidate(p.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Valider
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
