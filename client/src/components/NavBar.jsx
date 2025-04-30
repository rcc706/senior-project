import {Link} from "react-router-dom";
import NavLinks from "../components/NavLinks";
import parse from 'html-react-parser';
import home from "../styles/main.module.css";


export default function Navbar(props) {

    const NAV_DATA_ARR = props.navbarLinks;

    const navLinksArray = NAV_DATA_ARR.map((navLinkObject) => {

        switch(navLinkObject.compType) {
            case "Link":
                return <Link 
                key={navLinkObject.id.toString()}
                to={navLinkObject.to} 
                style={navLinkObject.style}
                >{parse(navLinkObject.content)}</Link>
            case "NavLinks":
                return <NavLinks 
                key={navLinkObject.id.toString} 
                navbarLinks={navLinkObject.content}/>
            default:
                return
        }   
    });

    return (
        <>
            <header>
                {navLinksArray}
            </header>
        </>
    );
}