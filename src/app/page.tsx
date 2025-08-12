// app/page.jsx
import React from "react";
import ProductCard from "@/components/ProductoCard";
import { ActiveLink } from "@/components/Activelinks/ActiveLink";
import Navbar from "@/components/Navbar/Navbar";

// Define el tipo del producto
export interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  descripcion: string;
  imagen: string;
}

// Función que obtiene los productos del backend
async function getProductos(): Promise<Producto[]> {
  const res = await fetch("http://localhost:5000/api/items", {
    cache: "no-store", // fuerza datos nuevos siempre
  });

  // if (!res.ok) {
  //   throw new Error("No se pudo cargar productos");
  // }

  return res.json();
}

const navItems = [
  { path: "/", text:"Home"},
  { path: "/registro", text:"Registro"},
  { path: "/pricing", text:"Pricing"},
  { path: "/contact", text:"Contact"},
];


// Componente principal de la página
export default async function Home() {
  const productos = await getProductos();

  return (
    <>
    
    <main className="min-h-screen p-6 bg-gray-100">
      <Navbar>
        {navItems.map((navItem) => (
          <ActiveLink key={navItem.path} {...navItem} />
        ))}
      </Navbar>


      <h1 className="text-3xl font-bold text-center mb-6">Productos en stock</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <ProductCard key={producto._id} producto={producto} />
        ))}
      </div>
    </main>

    </>
  );
}

// app/page.jsx