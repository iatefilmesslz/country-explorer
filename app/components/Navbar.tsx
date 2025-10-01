"use client";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

    return (
        <nav className="border-b sticky top-0 z-50 backdrop-blur-sm bg-card/80">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Título */}
                    <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Country Explorer
                    </h1>

                    {/* Links + Botón Dark/Light */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className={`px-3 py-1 rounded-md transition-colors font-medium ${pathname === "/"
                                ? "bg-primary text-primary-foreground dark:bg-white dark:text-black"
                                : "hover:bg-gray-100 dark:hover:bg-secondary text-black dark:text-white"
                                }`}
                        >
                            Inicio
                        </Link>

                        <Link
                            href="/favorites"
                            className={`px-3 py-1 rounded-md transition-colors font-medium ${pathname === "/favorites"
                                ? "bg-primary text-primary-foreground dark:bg-white dark:text-black"
                                : "hover:bg-gray-100 dark:hover:bg-secondary text-black dark:text-white"
                                }`}
                        >
                            Favoritos
                        </Link>

                        {/* Botón Dark/Light */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-secondary transition-colors"
                            aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
                        >
                            {theme === "dark" ? (
                                <Sun className="h-5 w-5 text-white" />
                            ) : (
                                <Moon className="h-5 w-5 text-black" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}