"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface Cliente {
  _id?: string;
  nombre: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Cliente>({
    nombre: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false); // 👈 alternar entre login y registro

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const url = isRegister
        ? "http://localhost:5000/api/clientes" // registro
        : "http://localhost:5000/api/clientes/login"; // login

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error en la operación");
      }

      const cliente = await res.json();

      // Guardamos en localStorage para usarlo en el perfil
      localStorage.setItem("cliente", JSON.stringify(cliente));

      // Redirigir al perfil
      router.push("/perfil");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
    <Link href="/">
      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all duration-300 ease-in-out">
        Home
      </button>
    </Link>
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? "Registro de Cliente" : "Iniciar Sesión"}
        </h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 👇 Solo pedimos el nombre si es registro */}
          {isRegister && (
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isRegister ? "Registrar" : "Iniciar Sesión"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 underline"
          >
            {isRegister ? "Inicia Sesión" : "Regístrate"}
          </button>
        </p>
      </div>
    </main>
    </>
  );
}
