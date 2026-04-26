// src/Dashboard/CoursManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function CoursManagement() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    hours: "",
    category: "",
  });
  const [catName, setCatName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Charger courses et categories
  const fetchCourses = async () => {
    try {
      const res = await axios.get("https://backendwnr2-1.onrender.com/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://backendwnr2-1.onrender.com/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  // Ajouter ou modifier un cours
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://backendwnr2-1.onrender.com/api/courses/${editingId}`, form);
        setMessage("✅ Cours modifié avec succès !");
      } else {
        await axios.post("https://backendwnr2-1.onrender.com/api/courses", form);
        setMessage("✅ Cours ajouté avec succès !");
      }
      setForm({ title: "", description: "", price: "", hours: "", category: "" });
      setEditingId(null);
      fetchCourses();
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de l'opération.");
    }
  };

  // Supprimer un cours
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce cours ?")) return;
    try {
      await axios.delete(`https://backendwnr2-1.onrender.com/api/courses/${id}`);
      setMessage("✅ Cours supprimé !");
      fetchCourses();
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de la suppression.");
    }
  };

  // Préparer la modification
  const handleEdit = (course) => {
    setForm({
      title: course.title,
      description: course.description,
      price: course.price,
      hours: course.hours,
      category: course.category,
    });
    setEditingId(course.id || course._id);
  };

  // Ajouter une catégorie
  const handleAddCategory = async () => {
    if (!catName) return;
    try {
      await axios.post("https://backendwnr2-1.onrender.com/api/categories", { name: catName });
      setCatName("");
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // Supprimer catégorie
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;
    try {
      await axios.delete(`https://backendwnr2-1.onrender.com/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Gestion des cours</h1>

      {/* Formulaire cours */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow space-y-3">
        <input
          type="text"
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Prix (DA)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Heures"
          value={form.hours}
          onChange={(e) => setForm({ ...form, hours: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Choisir une catégorie</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>

        <div className="flex gap-3 justify-end">
          {editingId && (
            <button
              type="button"
              onClick={() => setForm({ title: "", description: "", price: "", hours: "", category: "" }) || setEditingId(null)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Annuler
            </button>
          )}
          <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            {editingId ? "Modifier le cours" : "Ajouter le cours"}
          </button>
        </div>
      </form>

      {/* Gestion catégories */}
      <div className="mb-6 p-4 bg-white rounded shadow space-y-3">
        <h2 className="font-bold mb-2 text-orange-600">Catégories</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nouvelle catégorie"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            className="border px-3 py-2 rounded flex-1"
          />
          <button onClick={handleAddCategory} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            Ajouter
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
              <span>{cat.name}</span>
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Message */}
      {message && <p className="mb-4 text-green-600 font-semibold">{message}</p>}

      {/* Liste des cours */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.id || course._id}
            className="bg-white shadow rounded p-4 border border-orange-200 relative"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="font-bold text-lg">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
            <p className="text-orange-500 font-bold mt-2">Prix : {course.price} DA</p>
            <p className="text-gray-500 mt-1">Heures : {course.hours}</p>
            <p className="text-gray-700 mt-1">Catégorie : {course.category}</p>

            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEdit(course)}
                className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(course.id || course._id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
