import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';

import illustrationSvg from '../assets/illustration.svg';
import logoSvg from '../assets/logo.svg';
import googleIconSvg from '../assets/google-icon.svg';

import '../styles/auth.scss';

export function Home() {    

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        } else {
            history.push('/rooms/new');
        }
    }

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
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconSvg} alt="Criar sala com Google" /> Cria sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}
