import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { PropagateLoader } from "react-spinners";
import { confirmPayment } from "../features/cart/redux/cartService";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("processing");
  const navigate = useNavigate();

  const sessionId = searchParams.get("session_id");
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    const finalize = async () => {
      if (sessionId && token) {
        try {
          await confirmPayment(sessionId, token);
          setStatus("success");
        } catch (e) {
          setStatus("error");
        }
      }
    };
    finalize();
  }, [sessionId, token]);

  return (
    <Container className="text-center mt-5 pt-5 text-white">
      {status === "processing" ? (
        <div className="my-5">
          <h2>Conferma pagamento...</h2>
          <PropagateLoader color="#0dcaf0" />
        </div>
      ) : status === "success" ? (
        <div className="animate__animated animate__fadeIn">
          <i
            className="bi bi-check-circle-fill text-success"
            style={{ fontSize: "5rem" }}
          ></i>
          <h1>Grazie per l'acquisto!</h1>
          <p>L'ordine è stato confermato.</p>
          <Button variant="info" onClick={() => navigate("/catalog")}>
            Torna allo Shop
          </Button>
        </div>
      ) : (
        <div className="text-danger">
          <i
            className="bi bi-exclamation-triangle-fill"
            style={{ fontSize: "5rem" }}
          ></i>
          <h2>Errore durante la conferma.</h2>
          <Button variant="outline-light" onClick={() => navigate("/cart")}>
            Riprova
          </Button>
        </div>
      )}
    </Container>
  );
};

export default SuccessPage;
