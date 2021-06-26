import { useHistory, useParams } from 'react-router-dom';

import { useRoom } from '../hooks/useRoom';

import { Question } from '../components/Question';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import { database } from '../services/firebase';

import logoSvg from '../assets/logo.svg';
import deleteSvg from '../assets/delete.svg';
import checkSvg from '../assets/check.svg';
import answerSvg from '../assets/answer.svg';

import '../styles/room.scss';

type RoomParams = {
    id: string;
}

export function AdminRoom() {    

    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, roomName } = useRoom(roomId);
    const history = useHistory();

    async function handleHighlightQuestion(questionId: string) {
        const questionsRef = database.ref('rooms').child(roomId).child('questions');

        await questionsRef.child(questionId).update({
            isHighlighted: true
        });
    }

    async function handleAnswerQuestion(questionId: string) {
        const questionsRef = database.ref('rooms').child(roomId).child('questions');

        await questionsRef.child(questionId).update({
            hasAnswer: true
        });
    }

    async function handleDeleteQuestion(questionId: string) {
        const confirm = window.confirm("Tem certeza que deseja exluir esta pergunta?");

        if (confirm) {
            const questionsRef = database.ref('rooms').child(roomId).child('questions');

            await questionsRef.child(questionId).remove();
        }
    }

    async function handleCloseRoom() {
        const confirm = window.confirm("Tem certeza que deseja encerrar esta sala?");

        if (confirm) {
            await database.ref('rooms').child(roomId).update({
                closedAt: new Date()
            });

            history.push("/");
        }        
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoSvg} alt="Logo Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleCloseRoom}>Encerrar sala</Button>
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
                            <Question key={question.id} content={question.content} author={question.author} hasAnswer={question.hasAnswer} isHighlighted={question.isHighlighted}>
                                { !question.hasAnswer && (
                                    <>
                                        <button type="button" aria-label="Responder pergunta" onClick={() => handleAnswerQuestion(question.id)}>
                                            <img src={checkSvg} alt="Responder pergunta" />
                                        </button>
                                        <button type="button" aria-label="Destacar pergunta" onClick={() => handleHighlightQuestion(question.id)}>
                                            <img src={answerSvg} alt="Destacar pergunta" />
                                        </button>
                                    </>
                                )}                                
                                <button type="button" aria-label="Excluir pergunta" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteSvg} alt="Excluir pergunta" />
                                </button>
                            </Question>
                        );
                    })}
                </div>                
            </main>
        </div>
    );
}
