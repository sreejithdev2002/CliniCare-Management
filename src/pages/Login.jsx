import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/loginImage.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "staff@clinic.com" && password === "123456") {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex">
      <div className="hidden lg:flex flex-col w-[40%]">
        <div className="h-[50vh]">
          <img src={LoginImage} alt="" className="object-cover h-full w-full" />
        </div>
        <div className="bg-[#539765] h-[50vh] p-10 text-white">
          <h1 className="text-center text-4xl mb-5 robotoFont">CliniCare</h1>
          <div className="bg-[#3e8050] border-l-4 p-10 border-white rounded-md">
            <h3 className="text-xl font-semibold">
              Welcome to{" "}
              <span className="text-3xl font-normal robotoFont">CliniCare</span>
            </h3>
            <h2 className="text-2xl font-semibold">Clinic Management System</h2>
            <p className="text-sm mt-3">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
              aliquam officiis perferendis sunt.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center lg:px-20 w-[100%] h-[100vh] lg:h-auto lg:w-1/2">
        <div className="w-3/4">
          <h1 className="text-[#3e8050] text-3xl font-semibold mb-3 robotoFont">
            CliniCare
          </h1>
          <h2 className="text-3xl font-semibold text-gray-700">Login</h2>
          <p className="text-sm font-semibold text-gray-700">
            Enter your credentials to login to your account.
          </p>
          <form onSubmit={handleLogin} className="space-y-3 mt-5">
            <div className="flex flex-col space-y-2">
              <label>Email</label>
              <input
                type="text"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="border-1 shadow-sm rounded-md border-gray-300 p-2"
                placeholder="example: username@clinic.com"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Password</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="border-1 shadow-sm rounded-md border-gray-300 p-2"
                placeholder="Enter your password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <h3 className="text-end text-[#3e8050] font-semibold text-sm">
              Forgot Password?
            </h3>
            <button
              type="submit"
              className="bg-[#3e8050] hover:bg-[#548e63] text-white font-semibold w-full p-2 rounded-md shadow-md cursor-pointer transition-colors duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
