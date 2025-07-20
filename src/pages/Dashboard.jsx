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
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

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
    const updatedAppointments = appointments.filter((appt) => appt.id !== id);
    setAppointments(updatedAppointments);
    localStorage.setItem(
      "CliniCareAppointments",
      JSON.stringify(updatedAppointments)
    );
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
    Scheduled:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
  };

  return (
    <div className="h-[100dvh] lg:h-auto bg-white dark:bg-gray-900">
      <Header />
      <div className="flex flex-col px-10 lg:px-40 mt-10 pb-10">
        <div className="flex justify-between items-center p-2">
          <h2 className="text-2xl robotoFont dark:text-white text-black">
            Calendar
          </h2>
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
          <h2 className="text-2xl robotoFont mb-4 text-black dark:text-gray-100">
            Appointments for {dayjs().format("DD MMM YYYY")}
          </h2>
          <div className="overflow-auto max-h-[40vh] md:max-h-[60vh] lg:max-h-[50vh] shadow-sm rounded-md border border-gray-200 dark:border-gray-700">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr className="text-left text-sm text-gray-900 dark:text-gray-200">
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
                      className="border-t border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
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
                      <td className="px-6 py-4 whitespace-nowrap text-[#539765] dark:text-green-500">
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
                          className="text-blue-600 dark:text-blue-500 hover:underline text-sm cursor-pointer"
                          onClick={() => handleEditAppointment(appointment)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 dark:text-red-500 hover:underline text-sm cursor-pointer"
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
