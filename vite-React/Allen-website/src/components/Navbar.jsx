import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src="https://www.allen.ac.in/images/logo.png" alt="ALLEN Logo" width="100" />
                </Link>
            </div>
            <div className="navbar-links">
                <Link to="/exams">Exams</Link>
                <Link to="/programs">Programs</Link>
                <Link to="/scholarships">Scholarships</Link>
                <Link to="/test-series">Test Series</Link>
                <Link to="/study-materials">Study Materials</Link>
            </div>
        </nav>
    );
}

export default Navbar;