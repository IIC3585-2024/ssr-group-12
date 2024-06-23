// pages/Login.js
import React from "react";
import styles from "./Login.module.css";
import { redirect } from "next/navigation";
const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Login</h2>
        <form>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
