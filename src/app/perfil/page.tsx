"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Cliente {
  _id: string;
  nombre: string;
  email: string;
}

export default function PerfilPage() {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        // 1️⃣ Ver si hay cliente en localStorage
        const clienteGuardado = JSON.parse(localStorage.getItem("cliente") || "{}");

        if (!clienteGuardado?.email) {
          router.push("/general/login");
          return;
        }

        // 2️⃣ Obtener todos los clientes de la API
        const res = await fetch("http://localhost:5000/api/clientes");
        if (!res.ok) throw new Error("Error al obtener clientes");

        const data: Cliente[] = await res.json();

        // 3️⃣ Buscar el cliente correcto
        const clienteEncontrado = data.find(
          (c) => c.email === clienteGuardado.email
        );

        if (!clienteEncontrado) {
          router.push("/login");
        } else {
          setCliente(clienteEncontrado);
        }
      } catch (error) {
        console.error(error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("cliente");
    router.push("/login");
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between p-4">
        <div>
          {/* Nombre del cliente */}
          <h2 className="text-xl font-bold mb-2">
            {cliente?.nombre || "Cliente"}
          </h2>
          <hr className="border-gray-600 mb-4" />

          {/* Opciones */}
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => router.push("/productos")}
              className="bg-gray-700 p-2 rounded hover:bg-gray-600 text-left"
            >
              Productos / Items
            </button>
            <button
              onClick={() => router.push("/carrito")}
              className="bg-gray-700 p-2 rounded hover:bg-gray-600 text-left"
            >
              Carrito
            </button>
          </nav>
        </div>

        {/* Cerrar sesión */}
        <button
          onClick={handleLogout}
          className="bg-red-600 p-2 rounded hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Bienvenido, {cliente?.nombre}</h1>
        <p className="mt-2 text-gray-600">
          Aquí podrás ver tus productos y el historial de compras.
        </p>
      </main>
    </div>
  );
}
