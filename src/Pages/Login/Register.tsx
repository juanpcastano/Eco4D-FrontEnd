import { useDispatch } from "react-redux";
import { ApiCallRegister } from "../../services/authService";
import { registerInfo } from "../../models/registerInfo";
import { createAuth } from "../../Redux/States/auth";
import { createUser } from "../../Redux/States/user";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Login&register.module.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    idType: "",
    email: "",
    password: "",
    country: "",
    city: "",
    birthDate: "",
  });

  const idTypes = [
    { value: "CC", label: "C.C. - Cédula de Ciudadanía" },
    { value: "CE", label: "C.E. - Cédula de Extranjería" },
    { value: "TI", label: "T.I. - Tarjeta de Identidad" },
    { value: "PP", label: "Pasaporte" },
    { value: "PPT", label: "PPT - Permiso por Protección Temporal" },
  ];
  const register = async (registerInfo: registerInfo) => {
    try {
      const result = await ApiCallRegister(registerInfo);
      dispatch(createAuth(result.auth));
      dispatch(createUser(result.user.role));
      navigate("/history");
    } catch (error) {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
        <h2 className={styles.title}>Registro</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formRow}>
          <div className={styles.formGroup}>
              <label htmlFor="idType">Tipo de documento</label>
              <select
                id="idType"
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                {idTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.value}
                  </option>
                ))}
              </select>
            </div>
            

            <div className={styles.formGroup}>
              <label htmlFor="idNumber">Número de documento</label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>
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

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="country">País</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>  
          <div className={styles.formGroup}>
            <label htmlFor="birthDate">Fecha de nacimiento</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>


          <button type="submit" className="dark-gradient-green">
            Registrarme
          </button>
          <div className={styles.smbtandforgotcontainer}>
            <Link to="/login">
              Ya tengo cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
