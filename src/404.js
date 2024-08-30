import React from "react";
import { Link } from "react-router-dom";

const Error404Screen = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>Page Not Found</p>
      <Link to={"/"} style={styles.link}>
        Back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: "72px",
    margin: "0",
  },
  text: {
    fontSize: "24px",
  },
  link: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Error404Screen;
