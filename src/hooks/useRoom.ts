import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    hasAnswer: boolean,
    isHighighted: boolean,
    likes: Record<string, {
        authorId: string
    }>
}>;

type QuestionType = {
    id: string,
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    isHighighted: boolean,
    hasAnswer: boolean,
    likeCount: number,
    likeId: string | undefined
}

export function useRoom(roomId: string) {

    const { user } = useAuth();
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
                    hasAnswer: value.hasAnswer,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
                }
            });

            setQuestions(parsedQuestions);
            setRoomName(roomName);
        });

        return(() => {
            roomRef.off('value');
        });
    }, [roomId, user?.id]);

    return { questions, roomName };
}