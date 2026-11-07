import { useState } from "react";
import { FaTimes } from "react-icons/fa";

function SignupModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
        ...previousData,
        [name]: value,
    }));
    };


    const handleSubmit = (event) => {
    event.preventDefault();

    if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
    ) {
        alert("Please fill all fields");
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    alert("Registration successful!");

    onClose();
    };


    const handleLogin = (event) => {
  event.preventDefault();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No account found. Please signup first.");
    return;
  }

  if (
    formData.email === savedUser.email &&
    formData.password === savedUser.password
  ) {
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        username: savedUser.username,
        email: savedUser.email,
      })
    );

    alert("Login successful!");

    onClose();
  } else {
    alert("Invalid email or password");
  }
};

 return (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4">

    <div className="relative w-full max-w-lg bg-[#202125] p-8 text-gray-200">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-400 hover:text-white"
      >
        <FaTimes size={20} />
      </button>

      {/* Heading */}
      <h2 className="text-3xl font-semibold">
  {isLogin ? "Login" : "Signup"}
</h2>

<p className="mb-7 mt-2 text-gray-400">
  {isLogin
    ? "Don't have an account?"
    : "Already have an account?"}

  <button
    type="button"
    onClick={() => setIsLogin(!isLogin)}
    className="ml-2 font-semibold text-white hover:text-red-500"
  >
    {isLogin ? "Signup" : "Login"}
  </button>
</p>

      {/* Signup Form */}
     <form
  onSubmit={isLogin ? handleLogin : handleSubmit}
  className="space-y-5"
>
    {!isLogin && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border border-gray-700 bg-transparent px-4 py-4 outline-none focus:border-gray-400"
        />
    )}

    
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-700 bg-transparent px-4 py-4 outline-none focus:border-gray-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-700 bg-transparent px-4 py-4 outline-none focus:border-gray-400"
        />

        {!isLogin && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-700 bg-transparent px-4 py-4 outline-none focus:border-gray-400"
        />
        )}
        <button
          type="submit"
          className="w-full bg-red-600 py-3 text-lg text-white transition hover:bg-red-700"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

      </form>

    </div>
  </div>
);

}

export default SignupModal;