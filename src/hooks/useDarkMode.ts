import { useEffect } from 'react';
import { THEME_ENUM } from '@/constants/theme.constant';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { setMode } from '@/store/slices/themeSlice';
import type { Mode } from '@/@types/theme';

function useDarkMode(): [
    isEnabled: boolean,
    onModeChange: (mode: Mode) => void,
] {
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state) => state.theme.mode);

    const { MODE_DARK, MODE_LIGHT } = THEME_ENUM;

    const isEnabled = mode === MODE_DARK;

    const onModeChange = (mode: Mode) => {
        dispatch(setMode(mode));
    };

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const root = window.document.documentElement;
        root.classList.remove(isEnabled ? MODE_LIGHT : MODE_DARK);
        root.classList.add(isEnabled ? MODE_DARK : MODE_LIGHT);
    }, [isEnabled, MODE_DARK, MODE_LIGHT]);

    return [isEnabled, onModeChange];
}

export default useDarkMode;