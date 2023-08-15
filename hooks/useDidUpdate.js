import { useEffect, useRef } from 'react';

function useDidUpdate(callback, dependencies) {
    const hasMounted = useRef(false);

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
        } else {
            callback();
        }
    }, dependencies);
}

export default useDidUpdate;
