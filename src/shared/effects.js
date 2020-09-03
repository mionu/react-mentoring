import { useEffect, useState, useCallback } from 'react';

export const useComponentDidMount = (callback) => {
    useEffect(() => { callback(); }, []);
};

export const useToggle = (initialValue = false) => {
    const [flag, setFlag] = useState(initialValue);

    const toggle = useCallback(() => {
        setFlag(!flag);
    }, [flag]);

    return [flag, toggle];
};
