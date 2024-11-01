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
    email: "",
    password: "",
  });
  const login = async (credentials: credentials) => {
    try {
      const result = await ApiCallLogin(credentials);
      dispatch(createAuth(result.auth));
      dispatch(createUser(result.user.role));
      navigate("/history");
    } catch (error) {}
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
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
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
