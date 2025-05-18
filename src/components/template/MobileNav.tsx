import { useState, Suspense, lazy } from 'react';
import Drawer from '@/components/ui/Drawer';
import NavToggle from '@/components/shared/NavToggle';
import { DIR_RTL } from '@/constants/theme.constant';
import withHeaderItem, { WithHeaderItemProps } from '@/utils/hoc/withHeaderItem';
import navigationConfig from '@/configs/navigation.config';
import { useAppSelector } from '@/hooks/useRedux';
import { cn } from '@/lib/utils';

const VerticalMenuContent = lazy(
    () => import('@/components/template/VerticalMenuContent'),
);

type MobileNavToggleProps = {
    toggled?: boolean;
};

const MobileNavToggle = withHeaderItem<
    MobileNavToggleProps & WithHeaderItemProps
>(NavToggle);

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDrawer = () => {
        setIsOpen(true);
    };

    const handleDrawerClose = () => {
        setIsOpen(false);
    };

    const direction = useAppSelector((state) => state.theme.direction);
    const sideNavCollapse = useAppSelector((state) => state.theme.layout.sideNavCollapse);
    const currentRouteKey = useAppSelector((state) => state.routeKey.currentRouteKey);
    const userAuthority = useAppSelector((state) => state.auth.user.authority);

    return (
        <>
            <div className="text-2xl" onClick={handleOpenDrawer}>
                <MobileNavToggle toggled={isOpen} />
            </div>
            <Drawer
                title="Navigation"
                isOpen={isOpen}
                bodyClass={cn('p-0')}
                width={330}
                placement={direction === DIR_RTL ? 'right' : 'left'}
                onClose={handleDrawerClose}
                onRequestClose={handleDrawerClose}
            >
                <Suspense fallback={<></>}>
                    {isOpen && (
                        <VerticalMenuContent
                            collapsed={sideNavCollapse}
                            navigationTree={navigationConfig}
                            routeKey={currentRouteKey}
                            userAuthority={userAuthority as string[]}
                            direction={direction}
                            onMenuItemClick={handleDrawerClose}
                        />
                    )}
                </Suspense>
            </Drawer>
        </>
    );
};

export default MobileNav;