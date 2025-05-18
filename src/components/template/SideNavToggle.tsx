import withHeaderItem from '@/hoc/withHeaderItem';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { setSideNavCollapse } from '@/store/slices/themeSlice';
import useResponsive from '@/hooks/useResponsive';
import NavToggle from '@/components/shared/NavToggle';
import type { CommonProps } from '@/@types/common';

const _SideNavToggle = ({ className }: CommonProps) => {
    const dispatch = useAppDispatch();
    const sideNavCollapse = useAppSelector((state) => state.theme.layout.sideNavCollapse);
    const { larger } = useResponsive();

    const onCollapse = () => {
        dispatch(setSideNavCollapse(!sideNavCollapse));
    };

    return (
        <>
            {larger.md && (
                <div className={className} role="button" onClick={onCollapse}>
                    <NavToggle className="text-2xl" toggled={sideNavCollapse} />
                </div>
            )}
        </>
    );
};

const SideNavToggle = withHeaderItem(_SideNavToggle);

export default SideNavToggle;