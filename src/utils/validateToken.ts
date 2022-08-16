import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const validateToken = () => {
  try {
    const token = Cookies.get("refreshToken");

    if (!token) return false;

    const decoded = jwt.verify(
      atob(token),
      "aksdiqaskldnakjsbiqu123811231p2kmbasasdn"
    );

    if (decoded) return true;

    return false;
  } catch (error) {
    return false;
  }
};

export default validateToken;
