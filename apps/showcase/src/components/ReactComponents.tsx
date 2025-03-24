import { useState } from 'react';
import { Button } from '@narcecl/react';

export const ReactComponents = () => {
    const [ count, setCount ] = useState<number>(0);

    const handleClick = () => {
        console.log("Hello from React UI!");
        setCount(count + 1);
    }

    return (
        <Button
            label={`This is a React Button - ${count}`}
            onClick={handleClick}
        />
    );
}

export default ReactComponents;