import { useEffect } from 'react';
import i18n from 'i18next';
import { useAppSelector } from '@/hooks/useRedux';

const useLocale = () => {
    const currentLang = useAppSelector((state) => state.locale.currentLang);

    useEffect(() => {
        if (i18n.language !== currentLang) {
            const formattedLang = currentLang.replace(
                /-([a-z])/g,
                (_, g) => g[1].toUpperCase(),
            );
            i18n.changeLanguage(formattedLang);
        }
    }, [currentLang]);

    return {
        locale: currentLang,
    };
};

export default useLocale;