import { Link } from 'react-router-dom';

// import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';

import illustrationSvg from '../assets/illustration.svg';
import logoSvg from '../assets/logo.svg';

import '../styles/auth.scss';

export function NewRoom() {

    // const { user, signInWithGoogle } = useAuth();

    return(        
        <div id="page-auth">
            <aside>
                <img src={illustrationSvg} alt="Perguntas e respostas" />
                <h1>Crie salas de Q&amp;A ao vivo</h1>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoSvg} alt="Logo Letmeask" />
                    <h2>Criar uma nova sala</h2>                                                    
                    <form>
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">
                            Criar uma nova sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    );
}
