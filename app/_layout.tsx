import "@/global.css"
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"
import { Slot } from "expo-router"

export default function Layout() {
    return (
        <GluestackUIProvider>
            <Slot />
        </GluestackUIProvider>
    )
}
