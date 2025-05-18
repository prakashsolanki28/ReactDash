import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { setDirection } from '@/store/slices/themeSlice';
import type { Direction } from '@/@types/theme';

function useDirection(): [
    direction: Direction,
    setDirection: (dir: Direction) => void,
] {
    const dispatch = useAppDispatch();
    const direction = useAppSelector((state) => state.theme.direction);

    const setDirectionHandler = (dir: Direction) => {
        dispatch(setDirection(dir));
    };

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const root = window.document.documentElement;
        root.setAttribute('dir', direction);
    }, [direction]);

    return [direction, setDirectionHandler];
}

export default useDirection;