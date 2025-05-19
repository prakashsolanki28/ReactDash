import type { CommonProps } from '@/@types/common'
import { AppSidebar } from '@/components/app-sidebar'
import { NavActions } from '@/components/nav-actions'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const ShadcnLayout = ({ children }: CommonProps) => {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset>
                <header className="flex sticky top-0 z-10 border-b p-3 bg-background">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <div className="ml-auto px-3">
                        <NavActions />
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default ShadcnLayout