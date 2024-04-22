import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(
        useLocalStorageState(
            window.matchMedia("(prefer-color-scheme: dark)").matches,
            "dark-mode"
        )
    );

    useEffect(() => {
        if (!isDarkMode) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.add("light-mode");
            document.documentElement.classList.remove("dark-mode");
        }
    }, [isDarkMode]);

    function toggleDarkMode() {
        setIsDarkMode((dark) => !dark);
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined)
        throw new Error("the context is used outside Dark Mode Provider");
    return context;
}

export { useDarkMode, DarkModeProvider };
