
import { useEffect } from "react";
import FirstMenu from "./firstMenu";
import MainMenu from "./mainMenu";
import { useSelector } from "react-redux";

function Header() {

    const user = useSelector(state => state.user.user)
    return (<>
        <h1 >  !YAMMI</h1>
        {(user) ? <MainMenu />
            : <FirstMenu />}


    </>
    )
}
export default Header;