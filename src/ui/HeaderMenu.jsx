import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { AiOutlineUser } from "react-icons/ai";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeader = styled.ul`
    display: flex;
    gap: 0.4rem;
`;

function HeaderMenu() {
    const navigate = useNavigate();
    return (
        <StyledHeader>
            <li>
                <ButtonIcon onClick={() => navigate("/account")}>
                    <AiOutlineUser />
                </ButtonIcon>
            </li>
            <li>
                <DarkModeToggle />
            </li>
            <li>
                <Logout />
            </li>
        </StyledHeader>
    );
}

export default HeaderMenu;
