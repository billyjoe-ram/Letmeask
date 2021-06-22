import illustrationSvg from '../assets/illustration.svg';
import logoSvg from '../assets/logo.svg';
import googleIconSvg from '../assets/google-icon.svg';

export function Home() {
    return(        
        <div>            
            <aside>
                <img src={illustrationSvg} alt="Perguntas e respostas" />
                <h1>Crie salas de Q&amp;A ao vivo</h1>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div>
                    <img src={logoSvg} alt="Logo Letmeask" />
                    <button>
                        <img src={googleIconSvg} alt="Criar sala com Google" /> Cria sua sala com o Google
                    </button>
                    <div>Ou entre em uma sala</div>
                    <form>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <button type="submit">Entrar na sala</button>
                    </form>
                </div>
            </main>
        </div>
    );
}