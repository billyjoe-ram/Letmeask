import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import illustrationSvg from '../assets/illustration.svg';
import logoSvg from '../assets/logo.svg';

import '../styles/auth.scss';

export function NewRoom() {

    const { user } =  useAuth();
    const [ newRoom, setNewRoom ] = useState('');
    const history = useHistory();

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        
        console.log(newRoom);
        if (newRoom.trim()) {
            const roomRef = database.ref('rooms');
            const firebaseRoom = await roomRef.push({
                title: newRoom,
                authorId: user?.id
            });

            history.push(`/rooms/${firebaseRoom.key}`);

            return firebaseRoom;
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
                    <h2>Criar uma nova sala</h2>                                                    
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                            onChange={(event) => setNewRoom(event.target.value)}
                            value={newRoom.trim()}
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
