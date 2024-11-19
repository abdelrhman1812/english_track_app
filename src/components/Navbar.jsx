import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="">
      <h1 className="text-white">logo</h1>
      <ul className="d-flex justify-content-center align-items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Words
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sentences"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Sentences
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Notes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/topics"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Topics
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
