import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector((store) => store.auth.isUserLoggedIn);
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  } else {
    return children;
  }
};

export default Protected;
