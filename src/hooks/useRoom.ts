import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    hasAnswer: boolean,
    isHighighted: boolean
}>;

type QuestionType = {
    id: string,
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    hasAnswer: boolean,
    isHighighted: boolean
}

export function useRoom(roomId: string) {
    const [questions, setQuestions] =  useState<QuestionType[]>([]);
    const [roomName, setRoomName] =  useState('');

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

    return { questions, roomName };
}