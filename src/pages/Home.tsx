import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import illustrationSvg from '../assets/illustration.svg';
import logoSvg from '../assets/logo.svg';
import googleIconSvg from '../assets/google-icon.svg';

import '../styles/auth.scss';

export function Home() {    

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [ roomCode, setRoomCode ] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        } else {
            history.push('/rooms/new');
        }
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim()) {
            const roomRef = await database.ref('rooms').child(roomCode).get();
            
            if (roomRef.exists()) {
                history.push(`/rooms/${roomCode}`);
            } else {
                alert("Sala não existe");
                return;
            }
        } else {
            return;
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
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={(event) => setRoomCode(event.target.value)}
                            value={roomCode.trim()}
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
