import {Link} from "react-router-dom";
import home from "../styles/main.module.css";

export default function NavLinks(props) {

    const NAV_DATA_ARR = props.navbarLinks;

    const navLinksArray = NAV_DATA_ARR.map((navLinkObject) => {

        switch(navLinkObject.compType) {
            case "Link":
                return <Link 
                key={navLinkObject.id.toString()}
                to={navLinkObject.to} 
                >{navLinkObject.content}</Link>
            default:
                return
        }   
    });

    return (
        <>
                <nav>
                    <ul className={home.nav__links}>
                        {navLinksArray}
                    </ul>
                </nav>
        </>
    );
}