import "./SearchNav.css";
import logo from "../pics/OoOo-Ocean.PNG";

export default function SearchNav() {
    return (
        <nav className="search_nav">
            <i className="fa-solid fa-bars-staggered" onClick={() => document.querySelector("#small_screen").style.display = "block"}></i>

            
            <div id="profile_container">
                
                
                <div id="profileImg">
                    <img src={logo} id="logo" alt="Logo" />
                </div>
            </div>
        </nav>
    );
}
