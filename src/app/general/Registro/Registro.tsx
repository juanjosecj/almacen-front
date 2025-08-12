'use client';

import React, { useState } from 'react';
import './Registro.css'; // Asegúrate de tener el CSS

export default function RegistroUsuario() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    esAdmin: false,
  });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, type, checked } = e.target;
  setFormData({
    ...formData,
    [name]: type === 'checkbox' ? checked : value,
  });
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = formData.esAdmin
      ? 'http://localhost:5000/api/administradores'
      : 'http://localhost:5000/api/clientes';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al registrar usuario');

      alert('Usuario registrado exitosamente');
      setFormData({
        nombre: '',
        correo: '',
        contrasena: '',
        esAdmin: false,
      });
    } catch (error) {
      alert("Error al registrar usuario: " + (error instanceof Error ? error.message : ''));
    }
  };

  return (
    <main>
    <div className="registro-container" id="registro">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="registro-form">
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Correo:
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            name="esAdmin"
            checked={formData.esAdmin}
            onChange={handleChange}
          />
          ¿Es administrador?
        </label>

        <button type="submit">Registrarse</button>
      </form>
    </div>
    </main> 
  );
}
