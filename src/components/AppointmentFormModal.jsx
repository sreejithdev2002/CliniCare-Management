import React, { useState, useEffect } from "react";

export default function AppointmentFormModal({
  date,
  onClose,
  onSubmit,
  patients,
  doctors,
  initialData,
}) {
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    time: "",
    reason: "",
    status: "Scheduled",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const timeOptions = Array.from({ length: 17 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    const label = new Date(0, 0, 0, hour, minutes).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { value: `${hour.toString().padStart(2, "0")}:${minutes}`, label };
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#539765]/30 dark:bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-md w-[90%] max-w-md transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 robotoFont">
          {initialData ? "Edit Appointment" : "New Appointment"} –{" "}
          {date.format("DD MMM YYYY")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block font-medium">Patient</label>
            <select
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded px-2 py-2 mt-1"
              required
            >
              <option value="">Select Patient</option>
              {patients.map((p, i) => (
                <option key={i} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Doctor</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded px-2 py-2 mt-1"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((d, i) => (
                <option key={i} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Time</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded px-2 py-2 mt-1"
              required
            >
              <option value="">Select Time</option>
              {timeOptions.map((t, i) => (
                <option key={i} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Reason</label>
            <input
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded px-2 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded px-2 py-2 mt-1"
              required
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded cursor-pointer hover:outline dark:hover:outline-gray-600 outline-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#539765] hover:bg-[#498459] dark:bg-green-700 dark:hover:bg-green-800 text-white rounded cursor-pointer shadow-sm transition-colors duration-300"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
