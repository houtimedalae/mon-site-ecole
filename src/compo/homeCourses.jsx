import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HomeCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://backendwnr2-1.onrender.com/api/courses");
        setCourses(res.data.slice(0, 5));
      } catch (err) {
        console.error("Erreur chargement cours", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="bg-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITRE */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-14 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
        >
          Nos Cours
        </motion.h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >

              {/* TITRE */}
              <h3 className="mt-2 text-lg font-semibold text-gray-800 group-hover:text-orange-500 transition">
                {course.title}
              </h3>

              {/* CAT */}
              <span className="mt-2 text-xs font-semibold bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                {course.category}
              </span>

              {/* DESC */}
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                {course.description.length > 80
                  ? course.description.slice(0, 80) + "..."
                  : course.description}
              </p>

              {/* PRIX */}
              <p className="mt-4 text-orange-500 font-bold text-lg">
                {course.price} DA
              </p>

            </motion.div>
          ))}
        </div>

        {/* BTN */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/NosCours")}
            className="px-7 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 hover:shadow-orange-300/40 transition"
          >
            Voir plus →
          </motion.button>
        </div>

      </div>
    </section>
  );
}
