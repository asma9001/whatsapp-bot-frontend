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
  const navigate = useNavigate();

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

    console.log("🔗 Joining session:", sessionId);
    socket.emit("join-session", sessionId);

    axios
      .post(`${constant.apiUrl}/start-session`, { sessionId })
      .catch(() => {
        toast.error("Failed to start WhatsApp session");
        setLoading(false);
      });

    socket.on(`qr-${sessionId}`, (qr) => {
      console.log("📦 QR received:", qr);
      setQrCode(qr);
      setLoading(false);
    });

    socket.on(`authenticated-${sessionId}`, () => {
      toast.success("WhatsApp authenticated");
      navigate("/dashboard");
    });

    return () => {
      socket.off(`qr-${sessionId}`);
      socket.off(`authenticated-${sessionId}`);
    };
  }, [sessionId, socket, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4 text-[#128C7E]">
          Scan QR with WhatsApp
        </h2>
        {loading ? (
          <p>Waiting for QR code...</p>
        ) : qrCode ? (
          <>
            {console.log("🎯 Rendering QR with:", qrCode)}
            <QRCodeCanvas value={qrCode} size={256} />
          </>
        ) : (
          <p>No QR code available.</p>
        )}
      </div>
    </div>
  );
}
