import Logo from '@/components/template/Logo';
import { useAppSelector } from '@/hooks/useRedux';
import appConfig from '@/configs/app.config';
import { Link } from 'react-router-dom';
import type { Mode } from '@/@types/theme';

const HeaderLogo = ({ mode }: { mode?: Mode }) => {
    const defaultMode = useAppSelector((state) => state.theme.mode);

    return (
        <Link to={appConfig.authenticatedEntryPath}>
            <Logo imgClass="max-h-10" mode={mode || defaultMode} className="hidden lg:block" />
        </Link>
    );
};

export default HeaderLogo;