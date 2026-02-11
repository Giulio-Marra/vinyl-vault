import React from "react";
import { Container, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message =
    location.state?.message || "Something went wrong. Please try again later.";
  const statusCode = location.state?.statusCode || "Error";

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Container>
        <div className="text-center">
          <h1 className="text-white mb-3">⚠️ {statusCode}</h1>
          <p className="text-secondary mb-4" style={{ fontSize: "1.1rem" }}>
            {message}
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button
              variant="outline-light"
              onClick={() => navigate("/")}
              className="px-4"
            >
              Go Home
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => navigate(-1)}
              className="px-4"
            >
              Go Back
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ErrorPage;
