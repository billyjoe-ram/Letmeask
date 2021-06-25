import { useParams } from 'react-router-dom';

import { useRoom } from '../hooks/useRoom';

import { Question } from '../components/Question';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import logoImg from '../assets/logo.svg';

import '../styles/room.scss';

type RoomParams = {
    id: string;
}

export function AdminRoom() {

    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, roomName } = useRoom(roomId);    

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala - {roomName}</h1>
                    { questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>

                <div className="question-list">
                    {questions.map((question) => {
                        return(
                            <Question key={question.id} content={question.content} author={question.author}  />
                        );
                    })}
                </div>                
            </main>
        </div>
    );
}
