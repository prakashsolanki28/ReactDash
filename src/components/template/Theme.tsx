import ConfigProvider from '@/components/ui/ConfigProvider'
import { themeConfig } from '@/configs/theme.config'
import useDarkMode from '@/hooks/useDarkMode'
import useLocale from '@/hooks/useLocale'
import useDirection from '@/hooks/useDirection'

import type { CommonProps } from '@/@types/common'

const Theme = (props: CommonProps) => {

    useDarkMode()
    useDirection()

    const { locale } = useLocale()

    return (
        <ConfigProvider
            value={{
                locale: locale,
                ...themeConfig,
            }}
        >
            {props.children}
        </ConfigProvider>
    )
}

export default Theme
