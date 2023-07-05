import { useEffect, useRef } from 'react';

function useDidUpdate(callback) {
    const firstRenderRef = useRef(true);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        callback();
    }, [callback]);
}

export default useDidUpdate;
