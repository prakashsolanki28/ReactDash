import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/app/Home')),
        authority: [],
    },
    {
        key: 'settings',
        path: '/settings',
        component: lazy(() => import('@/views/settings')),
        authority: [],
    }
]