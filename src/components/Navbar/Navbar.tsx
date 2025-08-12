import './Navbar.css';

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        {children}
      </ul>
    </nav>
  );
}

