import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "react-toastify";

export default function PhoneNumberEntryPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inputError, setInputError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Require number to start with 1-9 and be 10-15 digits
    if (!phoneNumber.match(/^[1-9]\d{9,14}$/)) {
      setInputError("Please enter your full WhatsApp number in international format (e.g. 923001234567)");
      toast.error("Please enter a valid WhatsApp number (no starting zero, include country code)");
      return;
    }
    setInputError("");

    localStorage.setItem("userPhone", phoneNumber);
    navigate("/qr");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-[#128C7E] mb-4">
          Enter WhatsApp Number
        </h2>
        <Label htmlFor="phone">WhatsApp Number</Label>
        <Input
          id="phone"
          type="text"
          placeholder="e.g. 923001234567"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="mb-1"
        />
        {inputError && (
          <div className="text-red-600 text-sm mb-3">{inputError}</div>
        )}
        <Button type="submit" className="w-full bg-[#25D366] text-white">
          Continue to QR Scan
        </Button>
      </form>
    </div>
  );
}