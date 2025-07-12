import Header from "../components/Header";
import Calendar from "../components/Calender";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const appointments = [
  {
    time: "9:00 AM",
    patient: "Sophia Clark",
    reason: "Routine Checkup",
    status: "Confirmed",
  },
  {
    time: "10:30 AM",
    patient: "Ethan Bennett",
    reason: "Follow-up",
    status: "Confirmed",
  },
  {
    time: "1:00 PM",
    patient: "Olivia Carter",
    reason: "Consultation",
    status: "Confirmed",
  },
  {
    time: "2:45 PM",
    patient: "Noah Davis",
    reason: "Physical Exam",
    status: "Confirmed",
  },
  {
    time: "4:15 PM",
    patient: "Ava Foster",
    reason: "Vaccination",
    status: "Confirmed",
  },
];

function Dashboard() {
  return (
    <div>
      <Header />
      <div className="flex flex-col px-10 lg:px-40 my-10">
        <div className="flex justify-between items-center p-2">
          <h2 className="text-2xl robotoFont">Calendar</h2>
          <button className="bg-[#e5ffeb] hover:bg-[#caffd7] px-2 py-1 rounded-sm shadow-sm transition-colors duration-300 cursor-pointer">
            New Appointment
          </button>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Calendar />
        </LocalizationProvider>
        <div className="mt-5 robotoFont">
          <h2 className="text-2xl robotoFont">Appointments</h2>
          <div className=" mx-auto mt-5">
            <div className="overflow-x-auto shadow-sm rounded-md border border-gray-200">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="text-left text-sm text-gray-900">
                    <th className="px-6 py-3">Time</th>
                    <th className="px-6 py-3">Patient</th>
                    <th className="px-6 py-3">Reason</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.patient}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#539765]">
                        {appointment.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-[#e5ffeb] text-gray-700 rounded-sm">
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;