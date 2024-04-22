import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";
import { LuMoon, LuSunMoon } from "react-icons/lu";

function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {!isDarkMode ? <LuSunMoon /> : <LuMoon />}
        </ButtonIcon>
    );
}

export default DarkModeToggle;
