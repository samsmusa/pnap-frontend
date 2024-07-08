import {useState} from 'react';

export const useLocalStorage = <T, >(keyName: string) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value) as T;
            }
        } catch (err) {
            return
        }
    });

    const setValue = (newValue: T) => {
        try {
            if (newValue === undefined || newValue === null) {
                return
            }
            if (typeof newValue === 'string') {
                window.localStorage.setItem(keyName, newValue);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(newValue));
            }
        } catch (err) {
            console.error(err);
        }
        setStoredValue(newValue);
    };

    return [storedValue, setValue] as const;
};
