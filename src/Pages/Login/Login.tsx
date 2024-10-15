import { useDispatch } from "react-redux";
import { ApiCallLogin } from "../../services/authService";
import { credentials } from "../../models/credentials.model";
import { createAuth} from "../../Redux/States/auth";
import { createUser } from "../../Redux/States/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const login = async (credentials: credentials,role: string) => {
    try {
      const result = await ApiCallLogin(credentials);
      dispatch(createAuth(result));
      dispatch(createUser({role: role}))
      navigate("/history")
    } catch (error) {}
  };
  const navigate = useNavigate()
  

  return (
    <div>
      Hola, este es el login
      <button
        onClick={() => {
          login({
            email: "hola@gmail.com",
            password: "1234",
          },"patient");
        }}
      >
        login como paciente
      </button>
      <button
        onClick={() => {
          login({
            email: "hola@gmail.com",
            password: "1234",
          },"doctor");
        }}
      >
        login como doctor
      </button>
      <button
        onClick={() => {
          login({
            email: "hola@gmail.com",
            password: "1234",
          },"admin");
        }}
      >
        login como admin
      </button>
    </div>
  );
};
export default Login;
