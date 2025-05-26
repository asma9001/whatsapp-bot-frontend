import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import constant from "./constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export default function QRScannerPage() {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Initializing WhatsApp connection...");
  const navigate = useNavigate();
<<<<<<< HEAD
  const rawPhone = localStorage.getItem("userPhone");
  const sessionId = `session-${rawPhone}`;
=======
>>>>>>> 8c42fe8d83e036f4a593c94ca8b927ee2b5ea244

  const rawPhone = localStorage.getItem("userPhone");
  const sessionId = `session-${rawPhone}`; // ✅ match backend event

  const [socket] = useState(() =>
    io(constant.socketUrl, {
      transports: ["websocket"],
    })
  );

  useEffect(() => {
    if (!rawPhone) {
      navigate("/connect");
      return;
    }
    socket.emit("join-session", sessionId);

<<<<<<< HEAD
    setMessage("Starting WhatsApp session...");
    axios.post(`${constant.apiUrl}/start-session`, { sessionId })
      .then(() => {
        setMessage("Waiting for QR code...");
      })
=======
    console.log("🔗 Joining session:", sessionId);
    socket.emit("join-session", sessionId);

    axios
      .post(`${constant.apiUrl}/start-session`, { sessionId })
>>>>>>> 8c42fe8d83e036f4a593c94ca8b927ee2b5ea244
      .catch(() => {
        toast.error("Failed to start WhatsApp session");
        setMessage("Failed to start WhatsApp session.");
        setLoading(false);
      });

    socket.on(`qr-${sessionId}`, (qr) => {
<<<<<<< HEAD
=======
      console.log("📦 QR received:", qr);
>>>>>>> 8c42fe8d83e036f4a593c94ca8b927ee2b5ea244
      setQrCode(qr);
      setLoading(false);
      setMessage("Scan this QR with your WhatsApp app.");
    });

    socket.on(`authenticated-${sessionId}`, () => {
<<<<<<< HEAD
      setMessage("WhatsApp authenticated! Redirecting...");
=======
>>>>>>> 8c42fe8d83e036f4a593c94ca8b927ee2b5ea244
      toast.success("WhatsApp authenticated");
      setTimeout(() => navigate("/dashboard"), 1000); // delay to show message
    });

    return () => {
      socket.off(`qr-${sessionId}`);
      socket.off(`authenticated-${sessionId}`);
    };
<<<<<<< HEAD
  }, [sessionId, socket, navigate, rawPhone]);
=======
  }, [sessionId, socket, navigate]);
>>>>>>> 8c42fe8d83e036f4a593c94ca8b927ee2b5ea244

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4 text-[#128C7E]">
          Scan QR with WhatsApp
        </h2>
        <p className="mb-4 text-gray-700">{message}</p>
        {loading ? (
          <div className="text-gray-500">...</div>
        ) : qrCode ? (
<<<<<<< HEAD
          <QRCodeCanvas value={qrCode} size={256} />
=======
          <>
            {console.log("🎯 Rendering QR with:", qrCode)}
            <QRCodeCanvas value={qrCode} size={256} />
          </>
>>>>>>> 8c42fe8d83e036f4a593c94ca8b927ee2b5ea244
        ) : (
          <div className="text-red-500">No QR code available.</div>
        )}
      </div>
    </div>
  );
}
