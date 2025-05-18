import ScrollBar from '@/components/ui/ScrollBar';
import Logo from '@/components/template/Logo';
import VerticalMenuContent from '@/components/template/VerticalMenuContent';
import { useAppSelector } from '@/hooks/useRedux';
import navigationConfig from '@/configs/navigation.config';
import appConfig from '@/configs/app.config';
import { Link } from 'react-router-dom';
import {
    SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH,
    SIDE_NAV_CONTENT_GUTTER,
    HEADER_HEIGHT,
    LOGO_X_GUTTER,
} from '@/constants/theme.constant';
import type { Mode } from '@/@types/theme';
import { cn } from '@/lib/utils';

type SideNavProps = {
    translationSetup?: boolean;
    background?: boolean;
    className?: string;
    contentClass?: string;
    mode?: Mode;
};

const sideNavStyle = {
    width: SIDE_NAV_WIDTH,
    minWidth: SIDE_NAV_WIDTH,
};

const sideNavCollapseStyle = {
    width: SIDE_NAV_COLLAPSED_WIDTH,
    minWidth: SIDE_NAV_COLLAPSED_WIDTH,
};

const SideNav = ({
    translationSetup = true,
    background = true,
    className,
    contentClass,
    mode,
}: SideNavProps) => {
    const defaultMode = useAppSelector((state) => state.theme.mode);
    const direction = useAppSelector((state) => state.theme.direction);
    const sideNavCollapse = useAppSelector((state) => state.theme.layout.sideNavCollapse);
    const currentRouteKey = useAppSelector((state) => state.routeKey.currentRouteKey);
    const userAuthority = useAppSelector((state) => state.auth.user.authority);

    return (
        <div
            style={sideNavCollapse ? sideNavCollapseStyle : sideNavStyle}
            className={cn(
                'side-nav',
                background && 'side-nav-bg',
                !sideNavCollapse && 'side-nav-expand',
                className,
            )}
        >
            <Link
                to={appConfig.authenticatedEntryPath}
                className="side-nav-header flex flex-col justify-center"
                style={{ height: HEADER_HEIGHT }}
            >
                <Logo
                    imgClass="max-h-10"
                    mode={mode || defaultMode}
                    type={sideNavCollapse ? 'streamline' : 'full'}
                    className={cn(
                        sideNavCollapse && 'ltr:ml-[11.5px] ltr:mr-[11.5px]',
                        sideNavCollapse
                            ? SIDE_NAV_CONTENT_GUTTER
                            : LOGO_X_GUTTER,
                    )}
                />
            </Link>
            <div className={cn('side-nav-content', contentClass)}>
                <ScrollBar style={{ height: '100%' }} direction={direction}>
                    <VerticalMenuContent
                        collapsed={sideNavCollapse}
                        navigationTree={navigationConfig}
                        routeKey={currentRouteKey}
                        direction={direction}
                        translationSetup={translationSetup}
                        userAuthority={userAuthority || []}
                    />
                </ScrollBar>
            </div>
        </div>
    );
};

export default SideNav;