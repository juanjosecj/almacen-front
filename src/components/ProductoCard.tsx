// components/ProductoCard
import { Producto } from "@/app/page";
import React from "react";

// Componente para mostrar un producto individual

interface Props {
  producto: Producto;
}

export default function ProductCard({ producto }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <img
        src={`http://localhost:5000${producto.imagen}`}       alt={producto.nombre}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <h2 className="text-lg font-semibold">{producto.nombre}</h2>
      <p className="text-gray-700">💰 Precio: ${producto.precio}</p>
      <p className="text-gray-700">📦 Stock: {producto.cantidad}</p>
      <p className="text-gray-500 text-sm">{producto.descripcion}</p>
    </div>
  );
}
