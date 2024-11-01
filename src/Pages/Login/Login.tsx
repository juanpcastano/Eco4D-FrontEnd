import { useDispatch } from "react-redux";
import { ApiCallLogin } from "../../services/authService";
import { credentials } from "../../models/credentials.model";
import { createAuth } from "../../Redux/States/auth";
import { createUser } from "../../Redux/States/user";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Login&register.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo_electronico: "",
    contrasena: "",
  });
  const [Error, setError] = useState("")
  const login = async (credentials: credentials) => {
    try {
      const result = await ApiCallLogin(credentials);

      if(result.status >= 300){
        const Message = result.message
        setError(Message)
        if(result.status == 401){
          setError("Credenciales Incorrectas")
        }
        return
      }
      
      
      dispatch(createAuth({token : result.token}));
      dispatch(createUser(result.user));
      navigate("/history");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.loginContainer}>
      {/* Elementos decorativos */}
      <div
        className={`light-gradient-green ${styles.blob} ${styles.topLeft}`}
      ></div>
      <div
        className={`light-gradient-green ${styles.blob} ${styles.topRight}`}
      ></div>
      <div
        className={`light-gradient-green ${styles.blob} ${styles.bottomLeft}`}
      ></div>
      <div
        className={`light-gradient-green ${styles.blob} ${styles.bottomRight}`}
      ></div>

      {/* Formulario */}
      <div className={styles.loginFormContainer}>
        <h2 className={styles.title}>Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="correo_electronico">Email</label>
            <input
              type="email"
              id="correo_electronico"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className="dark-gradient-green">
            Iniciar sesión
          </button>
          <div className={styles.smbtandforgotcontainer}>
            <Link to="#" className={styles.link}>
              Olvidé mi contraseña
            </Link>
            <Link to="/register" className={styles.link}>
              Aún no tengo cuenta
            </Link>
            {Error && <p className={styles.error}>{Error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
