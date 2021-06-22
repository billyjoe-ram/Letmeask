import { ButtonHTMLAttributes } from 'react';

import '../styles/lma-button.scss';

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return(
        <button className="lma-button" {...props} />
    );
}
