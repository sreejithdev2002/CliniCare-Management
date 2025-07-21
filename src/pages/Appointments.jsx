import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import doctorsData from "../data/doctors.json";
import patientsData from "../data/patients.json";
import AppointmentFormModal from "../components/AppointmentFormModal";
import dayjs from "dayjs";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filters, setFilters] = useState({
    doctor: "All",
    status: "All",
  });

  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("CliniCareAppointments");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAppointments(parsed);
      setFilteredAppointments(parsed);
    }
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [filters, appointments]);

  const filterAppointments = () => {
    let filtered = [...appointments];

    if (filters.doctor !== "All") {
      filtered = filtered.filter((appt) => appt.doctor === filters.doctor);
    }

    if (filters.status !== "All") {
      filtered = filtered.filter((appt) => appt.status === filters.status);
    }

    filtered.sort((a, b) => {
      const dateTimeA = `${a.date} ${a.time}`;
      const dateTimeB = `${b.date} ${b.time}`;
      return dateTimeA.localeCompare(dateTimeB);
    });

    setFilteredAppointments(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const updated = appointments.filter((appt) => appt.id !== id);
    setAppointments(updated);
    localStorage.setItem("CliniCareAppointments", JSON.stringify(updated));
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingAppointment(null);
  };

  const handleModalSubmit = (updatedData) => {
    const updatedAppointments = appointments.map((appt) =>
      appt.id === editingAppointment.id ? { ...appt, ...updatedData } : appt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem(
      "CliniCareAppointments",
      JSON.stringify(updatedAppointments)
    );
  };

  const statusColors = {
    Scheduled:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
  };

  return (
    <div className="h-screen bg-white dark:bg-gray-900 sm:pb-10">
      <Header />
      <div className="px-6 lg:px-40 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl robotoFont dark:text-white text-black">
            All Appointments
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 p-4 shadow-sm rounded-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Filter by Doctor
              </label>
              <select
                name="doctor"
                value={filters.doctor}
                onChange={handleFilterChange}
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-2 py-2"
              >
                <option value="All">All Doctors</option>
                {doctorsData.map((doc, i) => (
                  <option key={i} value={doc.name}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Filter by Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-2 py-2"
              >
                <option value="All">All Statuses</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-auto max-h-[45vh] md:max-h-[50vh] lg:max-h-[60vh] shadow-sm rounded-md border border-gray-200 dark:border-gray-700">
          <table className="min-w-full bg-white dark:bg-gray-800 ">
            <thead className="text-left text-sm text-gray-900 dark:text-gray-200">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Doctor</th>
                <th className="px-6 py-3">Reason</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appt) => (
                  <tr
                    key={appt.id}
                    className="border-t border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dayjs(appt.date).format("DD MMM YYYY")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{appt.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appt.patient}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appt.doctor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#539765] dark:text-green-500">
                      {appt.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 text-sm font-medium rounded-sm ${
                          statusColors[appt.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <button
                        onClick={() => handleEdit(appt)}
                        className="text-blue-600 dark:text-blue-500 hover:underline text-sm cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(appt.id)}
                        className="text-red-600 dark:text-red-500 hover:underline text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <AppointmentFormModal
          date={dayjs(editingAppointment.date)}
          initialData={editingAppointment}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          doctors={doctorsData}
          patients={patientsData}
        />
      )}
    </div>
  );
}

export default Appointments;
