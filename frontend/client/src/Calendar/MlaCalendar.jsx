// Keep React import for compatibility with both old & new JSX transform
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import CalendarEventModal from "./CalendarEventModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const localizer = momentLocalizer(moment);
const BASE_URL = "https://e-services-citizen-backend.onrender.com"; // your Render backend

// --- Main Calendar Component ---
const MlaCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // State to manage the calendar's view for responsiveness
  const [calendarView, setCalendarView] = useState("month");
  const { mlaToken } = useAuth();

  // --- RESPONSIVENESS EFFECT ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCalendarView("day");
      } else {
        setCalendarView("month");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- FETCH EVENTS ---
  const loadEvents = async () => {
    if (!mlaToken) return;
    try {
      const res = await fetch(`${BASE_URL}/api/auth/mla/calendar`, {
        headers: { Authorization: `Bearer ${mlaToken}` },
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      if (data.success) {
        const formattedEvents = data.events.map((e) => ({
          ...e,
          start: new Date(e.startTime),
          end: new Date(e.endTime),
        }));
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error("Failed to load events:", error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [mlaToken]);

  // --- EVENT HANDLERS ---
  const handleSelectSlot = (slotInfo) => {
    setSelectedEvent({ start: slotInfo.start, end: slotInfo.end });
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // --- CREATE OR UPDATE EVENT ---
  const handleSaveEvent = async (formData, eventId) => {
    const endpoint = eventId
      ? `${BASE_URL}/api/auth/mla/calendar/${eventId}`
      : `${BASE_URL}/api/auth/mla/calendar/create`;

    const method = eventId ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mlaToken}`,
        },
        body: JSON.stringify({
          ...formData,
          startTime: new Date(formData.startTime).toISOString(),
          endTime: new Date(formData.endTime).toISOString(),
        }),
      });

      const result = await res.json();
      if (result.success) {
        loadEvents();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Failed to save event:", error);
    }

    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // --- DELETE EVENT ---
  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/mla/calendar/${eventId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${mlaToken}` },
        });

        const result = await res.json();
        if (result.success) {
          loadEvents();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
      setIsModalOpen(false);
      setSelectedEvent(null);
    }
  };

  // --- RENDER METHOD ---
  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        My Calendar
      </h1>
      <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md h-[65vh] md:h-[75vh]">
        <Calendar
          localizer={localizer}
          events={events}
          titleAccessor="title"
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          view={calendarView}
          onView={(view) => setCalendarView(view)}
        />
      </div>

      <CalendarEventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        eventInfo={selectedEvent}
      />
    </div>
  );
};

export default MlaCalendar;
