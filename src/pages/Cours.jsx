import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [message, setMessage] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          axios.get("https://backendwnr2-1.onrender.com/api/courses"),
          axios.get("https://backendwnr2-1.onrender.com/api/categories"),
        ]);
        setCourses(coursesRes.data);
        setCategories(["Toutes", ...categoriesRes.data.map((c) => c.name)]);
      } catch (err) {
        console.error("Erreur chargement données", err);
      }
    };
    fetchData();
  }, []);

  const filteredCourses =
    selectedCategory === "Toutes"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePreSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse) return;

    try {
      await axios.post("https://backendwnr2-1.onrender.com/api/preinscriptions", {
        studentName: form.name,
        phone: form.phone,
        email: form.email,
        courseId: selectedCourse.id,
      });

      setMessage("✅ Préinscription envoyée !");
      setForm({ name: "", phone: "", email: "" });
      setSelectedCourse(null);
    } catch (err) {
      setMessage("❌ Erreur lors de la préinscription.");
      console.error(err);
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen">

      {/* HERO */}
      <motion.div
        className="flex flex-col items-center justify-center text-center py-[11rem] sm:py-[12rem] px-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-600 mb-4">
          Découvrez nos cours d'art
        </h1>
        <p className="text-gray-700 max-w-md sm:max-w-2xl text-base sm:text-lg">
          Musique, dessin, calligraphie, théâtre et bien plus encore !
        </p>
      </motion.div>

      {/* CATEGORIES */}
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition ${
              selectedCategory === cat
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700 shadow hover:shadow-lg"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* COURSES GRID */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {currentCourses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-md border border-orange-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl"
          >
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 leading-snug">
                {course.title}
              </h2>
              <span className="self-start text-xs font-semibold bg-orange-100 text-orange-600 px-3 py-1 rounded-full mb-3">
                {course.category}
              </span>
              <p className="text-gray-600 text-sm sm:text-base flex-grow">
                {course.description.length > 90
                  ? course.description.slice(0, 90) + "..."
                  : course.description}
              </p>
              <div className="mt-5">
                <p className="text-orange-500 font-bold text-lg mb-3">{course.price} DA</p>
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="w-full bg-orange-500 text-white py-2.5 rounded-xl font-semibold hover:bg-orange-600 active:scale-95 transition"
                >
                  Préinscription
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 pb-16">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === index + 1
                  ? "bg-orange-500 text-white"
                  : "bg-white shadow hover:shadow-lg"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* MODAL PREINSCRIPTION */}
      {selectedCourse && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Préinscription pour {selectedCourse.title}
            </h2>

            <form onSubmit={handlePreSubmit} className="space-y-3">

              <input
                type="text"
                placeholder="Votre nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />

              <input
                type="tel"
                placeholder="Votre téléphone"
                value={form.phone}
                maxLength={12}
                pattern="\d*"
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, ""); // que chiffres
                  setForm({ ...form, phone: val });
                }}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />

              <input
                type="email"
                placeholder="Votre email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Envoyer
                </button>
              </div>

            </form>

            {message && (
              <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
            )}

          </div>
        </motion.div>
      )}

    </div>
  );
};

export default Courses;
