import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import logoImg from '../assets/logo.svg';

import '../styles/room.scss';

type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    hasAnswer: boolean,
    isHighighted: boolean
}>;

type Question = {
    id: string,
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    hasAnswer: boolean,
    isHighighted: boolean
}

export function Room() {

    const { user } = useAuth();    

    const params = useParams<RoomParams>();
    const roomId = params.id;
    const [roomName, setRoomName] =  useState('');
    const [newQuestion, setNewQuestion] =  useState('');
    const [questions, setQuestions] =  useState<Question[]>([]);

    useEffect(() => {
        const roomRef = database.ref('rooms').child(roomId);

        roomRef.on('value', (room) => {
            const roomData = room.val();
            const questions: FirebaseQuestions = roomData.questions ?? {};
            const roomName = roomData.title;
            
            const parsedQuestions = Object.entries(questions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighighted: value.isHighighted,
                    hasAnswer: value.hasAnswer
                }
            });

            setQuestions(parsedQuestions);
            setRoomName(roomName);
        });
    }, [roomId]);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();
        
        if(newQuestion.trim()) {
            if (user) {
                const question = {
                    content: newQuestion,
                    author: {
                        name: user.name,
                        avatar: user.avatar
                    },
                    isHighlighted: false,
                    hasAnswer: false
                };

                await database.ref('rooms').child(roomId).child('questions').push(question);

                setNewQuestion('');
            } else {
                throw new Error('Sem usuário. Usuário deve estar logado');
            }
        } else {
            return;
        }
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo Letmeask" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala - {roomName}</h1>
                    { questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea placeholder="O que você quer perguntar?" onChange={(event) => { setNewQuestion(event.target.value) } } value={newQuestion} />

                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar as string} alt={user.name as string} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta <button type="button">faça seu login</button> </span>
                        ) }
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}