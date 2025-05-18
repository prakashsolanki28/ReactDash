import { useMemo, lazy } from 'react'
import type { CommonProps } from '@/@types/common'
import type { JSX, LazyExoticComponent } from 'react'

type LayoutType = 'simple' | 'split' | 'card'

type Layouts = Record<
    LayoutType,
    LazyExoticComponent<<T extends CommonProps>(props: T) => JSX.Element>
>

const currentLayoutType: LayoutType = 'split'

const layouts: Layouts = {
    simple: lazy(() => import('./layouts/auth-simple-layout')),
    split: lazy(() => import('./layouts/auth-split-layout')),
    card: lazy(() => import('./layouts/auth-card-layout')),
}

const AuthLayout = ({ children }: CommonProps) => {
    const Layout = useMemo(() => {
        return layouts[currentLayoutType]
    }, [])

    return <Layout>{children}</Layout>
}

export default AuthLayout
