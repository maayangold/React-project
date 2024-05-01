import { useEffect } from "react";
import FirstMenu from "./firstMenu";
import MainMenu from "./mainMenu";
import { useSelector } from "react-redux";
import { Typography, Container } from "@mui/material";

function Header() {
    const user = useSelector(state => state.user.user);

    return (
        <div style={{ backgroundColor: "#bdaeae" }}>
            <div style={{ padding: "20px" }}>
                <Container maxWidth="lg">
                    <Typography className="title" variant="h2" style={{ backgroundColor: "transparent" }}>
                     ! Y A A M Y 
                    </Typography>
                
                    {user ? <MainMenu /> : <FirstMenu />}
                </Container>
            </div>
        </div>
    )
}

export default Header;

