import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span className="mr-6">
              <RiMoneyDollarCircleLine />
            </span>
              <span className="sr-only">PilaCoin</span>
            </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home<span className="sr-only"></span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logs">Logs<span className="sr-only"></span></Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/carteira">Carteira<span className="sr-only"></span></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
