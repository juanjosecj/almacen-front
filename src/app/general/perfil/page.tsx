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
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("cliente");
    if (!data) {
      router.push("/general/login");
    } else {
      setCliente(JSON.parse(data));
    }
  }, [router]);

  if (!cliente) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Bienvenido {cliente.nombre}
        </h1>
        <p className="text-center">Este es tu perfil.</p>
      </div>
    </main>
  );
}
