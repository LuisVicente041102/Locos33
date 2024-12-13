import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        console.log("Token en frontend:", token);
        const response = await axios.get(
          `http://localhost:3001/api/users/verify-email?token=${token}`
        );
        console.log("Respuesta del servidor:", response);

        if (response.status === 200) {
          setMessage(response.data.message);
        } else {
          setMessage("Error al verificar el correo. Intenta de nuevo.");
        }
      } catch (error) {
        console.error(
          "Error al verificar el correo:",
          error.response.data.message
        );
        setMessage(
          error.response.data.message ||
            "Error al verificar el correo. Intenta de nuevo."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage("No se encontró un token de verificación.");
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {loading ? (
          <p className="text-center text-lg font-semibold text-blue-500">
            Verificando correo...
          </p>
        ) : (
          <p
            className={`text-center text-lg font-semibold ${
              message.includes("exitosamente")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
