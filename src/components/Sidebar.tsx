import { logout } from '@/app/components-form-and-navbar/_actions/logout';
import { useRouter } from 'next/navigation';

const Sidebar = ({ usuario }: { usuario: any }) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout()
  };

  return (
    <div className="sidebar" style={{ 
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      color: 'white'
    }}>
      <div>
        <h2 style={{ textAlign: 'center', color: 'white' }}>Encurta Ai!</h2>
        <div className="user-info" style={{ justifyContent: 'center' }}>
          <span style={{ color: 'white' }}>Bem-vindo, {usuario?.name}</span>
        </div>
        <ul style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '15px',
          marginTop: '20px'
        }}>
          <li 
            onClick={() => handleNavigation('/home')}
            style={{ 
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              background: 'rgba(255, 255, 255, 0.1)',
              width: '80%',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            Home
          </li>
          <li 
            onClick={() => handleNavigation('/historico')}
            style={{ 
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              background: 'rgba(255, 255, 255, 0.1)',
              width: '80%',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            Histórico
          </li>
        </ul>
      </div>

      <div className="logout">
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
            cursor: 'pointer'
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;