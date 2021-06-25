import copySvg from '../assets/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return(
        <button className="room-code" onClick={copyRoomCodeToClipboard} title="Copiar código da sala">
            <div>
                <img src={copySvg} alt="Copiar código da sala" />
            </div>            
            <span>Sala {props.code}</span>
        </button>
    );
}