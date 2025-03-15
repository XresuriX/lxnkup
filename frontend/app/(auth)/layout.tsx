import { Inter } from "next/font/google"

import "../globals.css"
import { title } from "process"

export const metadata = {
    title: "LxnkUp",
    description: "A social media website "
}

const inter = Inter({ subsets: ["latin"]})

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return(
        <html lang="en">
            <body className={`${inter.className} bg-dark-1`}>
                {children}
            </body>
        </html>
    )
}
