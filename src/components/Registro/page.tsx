export default function RegistroUsuario() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log("Formulario enviado");
  };

  return (
    <main>
      <div className="registro-container" id="registro">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit} className="registro-form">
          <label>
            Nombre:
            <input type="text" name="nombre" required />
          </label>
          <label>
            Correo Electrónico:
            <input type="email" name="email" required />
          </label>
          <label>
            Contraseña:
            <input type="password" name="password" required />
          </label>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </main>
  );
}