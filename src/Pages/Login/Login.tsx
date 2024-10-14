import { useDispatch } from "react-redux";
import { ApiCallLogin } from "../../services/authService";
import { credentials } from "../../models/credentials.model";
import { createAuth} from "../../Redux/States/auth";

const Login = () => {
  const dispatch = useDispatch();
  const login = async (credentials: credentials) => {
    try {
      const result = await ApiCallLogin(credentials);
      dispatch(createAuth(result));
    } catch (error) {}
  };
  

  return (
    <div>
      Hola, este es el login
      <button
        onClick={() => {
          login({
            email: "hola@gmail.com",
            password: "1234",
          });
        }}
      >
        login
      </button>
    </div>
  );
};
export default Login;
