import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Event() {
  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
  });

  /* =========================
     📥 GET EVENTS
  ========================= */
  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://backendwnr2-1.onrender.com/api/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* =========================
     📸 IMAGE + COMPRESSION BASE64
     (FIX 413 WITHOUT BACKEND CHANGE)
  ========================= */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        // 🔥 limite largeur (compression)
        const MAX_WIDTH = 800;

        const scale = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 🔥 compression qualité (0.7 = bon équilibre)
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

        setForm((prev) => ({
          ...prev,
          image: compressedBase64,
        }));
      };
    };

    reader.readAsDataURL(file);
  };

  /* =========================
     ➕ CREATE EVENT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title) return;

    try {
      await axios.post("https://backendwnr2-1.onrender.com/api/events", form);

      setForm({
        title: "",
        description: "",
        date: "",
        image: "",
      });

      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  /* =========================
     ❌ DELETE EVENT
  ========================= */
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backendwnr2-1.onrender.com/api/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Gestion des événements 🎉
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-xl shadow mb-8 space-y-3"
      >
        <input
          type="text"
          placeholder="Titre de l'événement"
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <input type="file" onChange={handleImage} />

        {/* PREVIEW IMAGE */}
        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="w-full h-40 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Ajouter événement
        </button>
      </form>

      {/* LIST EVENTS */}
      <div className="grid md:grid-cols-2 gap-4">
        {events.length === 0 ? (
          <p className="text-gray-500">
            Aucun événement pour le moment
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              {event.image && (
                <img
                  src={event.image}
                  className="w-full h-40 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-xl font-bold">
                  {event.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {event.description}
                </p>

                <p className="text-orange-500 mt-2">
                  📅 {event.date}
                </p>

                <button
                  onClick={() => handleDelete(event.id)}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
