import Header from "../components/Header";
import Calendar from "../components/Calender";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import AppointmentFormModal from "../components/AppointmentFormModal";
import patientsData from "../data/patients.json";
import doctorsData from "../data/doctors.json";
import dayjs from "dayjs";

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(null); // for modal
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null); // for editing

  const today = dayjs().format("YYYY-MM-DD");

  const handleDateSelect = (date) => {
    if (!editingAppointment) {
      setSelectedDate(dayjs(date));
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate(null);
    setEditingAppointment(null);
  };

  const handleAddAppointment = (newAppt) => {
    const newEntry = {
      ...newAppt,
      id: editingAppointment ? editingAppointment.id : Date.now(),
      date: selectedDate ? selectedDate.format("YYYY-MM-DD") : today,
    };

    const updatedAppointments = editingAppointment
      ? appointments.map((appt) =>
          appt.id === editingAppointment.id ? newEntry : appt
        )
      : [...appointments, newEntry];

    setAppointments(updatedAppointments);
    localStorage.setItem(
      "CliniCareAppointments",
      JSON.stringify(updatedAppointments)
    );
    handleCloseModal();
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const updatedAppointments = appointments.filter((appt) => appt.id !== id);
      setAppointments(updatedAppointments);
      localStorage.setItem(
        "CliniCareAppointments",
        JSON.stringify(updatedAppointments)
      );
    }
  };

  const handleEditAppointment = (appt) => {
    setEditingAppointment(appt);
    setSelectedDate(dayjs(appt.date));
    setShowModal(true);
  };

  useEffect(() => {
    const storedAppointments = localStorage.getItem("CliniCareAppointments");
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  const filteredAppointments = appointments
    .filter((appt) => appt.date === today)
    .sort((a, b) => a.time.localeCompare(b.time));

  const statusColors = {
    Scheduled: "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col px-10 lg:px-40 my-10">
        <div className="flex justify-between items-center p-2">
          <h2 className="text-2xl robotoFont">Calendar</h2>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Calendar onDateSelect={handleDateSelect} />
        </LocalizationProvider>

        {showModal && (
          <AppointmentFormModal
            onClose={handleCloseModal}
            date={selectedDate}
            onSubmit={handleAddAppointment}
            patients={patientsData}
            doctors={doctorsData}
            initialData={editingAppointment}
          />
        )}

        <div className="mt-5 robotoFont">
          <h2 className="text-2xl robotoFont mb-4">
            Appointments for {dayjs().format("DD MMM YYYY")}
          </h2>
          <div className="overflow-auto max-h-[40vh] md:max-h-[60vh] lg:max-h-[50vh] shadow-sm rounded-md border border-gray-200">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="text-left text-sm text-gray-900">
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
                  filteredAppointments.map((appointment, index) => (
                    <tr
                      key={appointment.id}
                      className="border-t border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.patient}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.doctor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#539765]">
                        {appointment.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 text-sm font-medium rounded-sm ${
                            statusColors[appointment.status] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button
                          className="text-blue-600 hover:underline cursor-pointer"
                          onClick={() => handleEditAppointment(appointment)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline cursor-pointer"
                          onClick={() =>
                            handleDeleteAppointment(appointment.id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 text-gray-500 text-sm"
                    >
                      No appointments for today.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
