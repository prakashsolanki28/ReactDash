import type { CommonProps } from '@/@types/common'
import type { ElementType, Ref } from 'react'
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'

export interface SpinnerProps extends CommonProps {
    customColorClass?: string
    enableTheme?: boolean
    indicator?: ElementType
    isSpining?: boolean
    size?: string | number
    ref?: Ref<HTMLElement>
    className?: string
    style?: React.CSSProperties
}

const Spinner = (props: SpinnerProps) => {
    const {
        className,
        customColorClass,
        enableTheme = true,
        indicator: Component = Loader,
        isSpining = true,
        size = 20,
        style,
        ref,
        ...rest
    } = props

    const spinnerColor = customColorClass || (enableTheme && 'text-primary')

    const spinnerStyle = {
        height: size,
        width: size,
        ...style,
    }

    const spinnerClass = cn(
        isSpining && 'animate-spin',
        spinnerColor,
        className,
    )

    return (
        <Component
            ref={ref}
            style={spinnerStyle}
            className={spinnerClass}
            {...rest}
        />
    )
}

export default Spinner
