import { NavLink } from "react-router-dom";
import AuthProvider from "../AuthProvider";
import { useAuth } from "../AuthProvider";

const Header = () => {
  const result = useAuth(); //consume the context
  const authData = result?.authData;
  return (
    <AuthProvider>
      <header>
        <nav>
          <ul>
            {authData?.name ? (
              <li>
                <NavLink to="/">Shopping List</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </AuthProvider>
  );
};

export default Header;
