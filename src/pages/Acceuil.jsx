import React, { useEffect, useState } from "react";
import axios from "axios";

import Hero from "../compo/hero";
import Aprecu from "../compo/apercu";
import Pourqoui from "../compo/pourqoui";
import Contact from "../compo/contact";
import HomeCourses from "../compo/homeCourses";
import FeedbackSlider from "../compo/feed";

export default function Acceuil() {
  const [events, setEvents] = useState([]);

  // 📥 GET EVENTS
  useEffect(() => {
    axios
      .get("https://backendwnr2-1.onrender.com/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Hero />
     

     {/* 🎉 EVENTS SECTION (STORY STYLE) */}
{events.length > 0 && (
  <section className="py-20 bg-white">
    
    {/* TITRE */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
        Événements de l'école
      </h2>
      <p className="text-gray-500 mt-3">
        Découvrez la vie artistique de notre école à travers nos événements
      </p>
    </div>

    <div className="space-y-24 max-w-6xl mx-auto px-6">

      {events.map((event, index) => (
        <div
          key={event.id}
          className={`flex flex-col md:flex-row items-center gap-10 ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >

          {/* IMAGE (GRANDE + IMMERSIVE) */}
          <div className="w-full md:w-1/2">
            {event.image && (
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img
  src={event.image}
  className="w-full h-[400px] object-contain bg-gray-100 hover:scale-105 transition duration-700"
/>

              </div>
            )}
          </div>

          {/* TEXTE (SÉPARÉ DE L’IMAGE) */}
          <div className="w-full md:w-1/2 space-y-4">

            <span className="inline-block text-sm font-semibold text-orange-500">
              📅 {event.date}
            </span>

            <h3 className="text-3xl font-bold text-gray-800">
              {event.title}
            </h3>

            <p className="text-gray-600 leading-relaxed text-lg">
              {event.description}
            </p>

            {/* petit décor */}
            <div className="w-20 h-1 bg-orange-400 rounded-full"></div>

          </div>

        </div>
      ))}

    </div>
  </section>
)}

        <Aprecu />
      <Pourqoui />
      <HomeCourses />
      <FeedbackSlider />
      <Contact />
    </div>
  );
}
