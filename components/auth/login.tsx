import React, { useState } from "react";
import { BACKEND_BASE } from "@/lib/backend";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  jwtToken?: string;
  token?: string;
  accessToken?: string;
  role?: Array<{ roleName: string }>;
  user?: {
    role?: Array<{ roleName: string }>;
  };
  roleName?: string;
  userRole?: string;
  message?: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BACKEND_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await res.json()) as LoginResponse;
      console.log("🟩 Login Response:", data);

      if (!res.ok) {
        alert(data?.message || "Invalid email or password.");
        setFormData({ email: "", password: "" });
        return;
      }

      const jwtToken = (data?.jwtToken || data?.token || data?.accessToken) as string | undefined;

      // Try a few possible places for role name
      const rawRole =
        data?.role?.[0]?.roleName || data?.user?.role?.[0]?.roleName || data?.admin?.role?.[0]?.roleName   || data?.roleName || data?.userRole || null;
      const roleName = rawRole ? String(rawRole).trim() : null;
      console.log("🧩 Detected Role:", roleName);

      if (!jwtToken) {
        alert("Token not found in response.");
        setFormData({ email: "", password: "" });
        return;
      }

      const roleLower = roleName ? roleName.toLowerCase() : "";

      if (roleLower === "admin") {
        localStorage.setItem("adminToken", jwtToken);
        localStorage.setItem("roleName", "Admin");
        localStorage.setItem("data", JSON.stringify(data));
        alert("Welcome, Admin!");
        router.push("/admin");
      } else {
        // default to user
        localStorage.setItem("userToken", jwtToken);
        localStorage.setItem("roleName", "User");
        localStorage.setItem("data", JSON.stringify(data));
        alert("Welcome, User!");
        router.push("/");
      }

      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("❌ Login Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Login to access your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg shadow-md transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
