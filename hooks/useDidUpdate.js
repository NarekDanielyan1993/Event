import { useEffect, useRef } from 'react';

function useDidUpdate(callback, dependencies) {
    const hasMounted = useRef(false);

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }
        callback();
    }, dependencies);
}

export default useDidUpdate;
