import { logout } from '@/app/components-form-and-navbar/_actions/logout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Sidebar = ({ usuario }: { usuario: any }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout()
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Botão do Menu Hamburguer - Visível apenas em Mobile */}
      <button 
        className="mobile-menu-button"
        onClick={toggleMenu}
        style={{
          display: 'none',
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '8px'
        }}
      >
        {isMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="#1e3c72" />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isMenuOpen ? 'mobile-open' : ''}`} style={{ 
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed'
      }}>
        {/* Cabeçalho */}
        <div className="sidebar-header">
          <h2 style={{ textAlign: 'center', color: 'white', padding: '20px 0' }}>
            Encurta Ai!
          </h2>
          <div className="user-info" style={{ textAlign: 'center', padding: '10px 0' }}>
            <span style={{ color: 'white' }}>Bem-vindo, {usuario?.name}</span>
          </div>
        </div>

        {/* Navegação Central */}
        <div className="sidebar-nav" style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '20px 0'
        }}>
          <ul style={{ 
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px'
          }}>
            <li 
              onClick={() => handleNavigation('/home')}
              className="nav-item"
              style={{ 
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.1)',
                width: '80%',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Home
            </li>
            <li 
              onClick={() => handleNavigation('/historico')}
              className="nav-item"
              style={{ 
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.1)',
                width: '80%',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Histórico
            </li>
          </ul>
        </div>

        {/* Botão de Logout no Rodapé */}
        <div className="logout" style={{
          padding: '20px',
          marginTop: 'auto'
        }}>
          <button 
            className="logout-button"
            onClick={handleLogout}
            style={{
              width: '100%',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            Sair
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;