import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="">
      <h1 className="text-white">logo</h1>
      <ul className="d-flex justify-content-center align-items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Words
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sentences"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Sentences
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notes"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Notes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/topics"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Topics
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
