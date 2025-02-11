import { Link } from '@prisma/client';
import { useState } from 'react';
import { shortenLink } from './linkCreate';
interface ShortenerFormProps {
  onShorten: (link: Link) => void;
  usuario: any;
}

const ShortenerForm: React.FC<ShortenerFormProps> = ({ onShorten, usuario }) => {
  const [url, setUrl] = useState('');
  // Função para encurtar a URL
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      console.log(usuario);
      if(usuario){
        if(usuario?.id){
        const response = await shortenLink(url,usuario?.id);
        if(response.success){
          const shortUrl = response.data;
          console.log(shortUrl);
          if(shortUrl){
            onShorten(shortUrl); // Chama a função passada como prop
            setUrl(''); // Limpa o campo de entrada
          }else{
            alert('Erro ao encurtar a URL.');
          }
        }else{
          alert('Erro ao encurtar a URL.'+response.error);
          console.log(response.error);
        }
        }else{
          alert('Usuário não encontrado.');
          console.log(usuario);
        }
      }else{
        alert('Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao encurtar a URL:', error);
      //alert(error.response?.data?.error || 'Erro ao encurtar a URL.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shorten-form">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Insira a URL longa aqui"
        required
        name="url"
        className="input-url"
      />
      <button type="submit" className="btn-shorten">
        Encurtar
      </button>
    </form>
  );
};

export default ShortenerForm;
