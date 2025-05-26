"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { MessageCircle, Lock, Mail, ArrowRight } from "lucide-react";
import constant from "../constant";
import axios from "axios";

// ✅ Toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${constant.apiUrl}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        const userRole = response.data.userRole;

        localStorage.setItem("userId", response.data.userId);

        toast.success("Login successful");

        setTimeout(() => {
          window.location.href = "/connect";
        }, 1000);
      } else {
        toast.error("Invalid credentials. Please try again");
      }
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#DCF8C6] to-white">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#128C7E] flex-col items-center justify-center p-12 text-white">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-8">
            <MessageCircle size={80} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-6">Welcome to MessageHub</h1>
          <p className="text-lg opacity-90 mb-8">
            Connect with your audience through powerful messaging campaigns and
            analytics.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-12">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium mb-1">Campaigns</h3>
              <p className="text-sm opacity-80">
                Create and manage messaging campaigns
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium mb-1">Analytics</h3>
              <p className="text-sm opacity-80">
                Track performance and engagement
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium mb-1">Accounts</h3>
              <p className="text-sm opacity-80">
                Manage your team and permissions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-md border-none shadow-xl bg-white/80 backdrop-blur-sm mx-auto">
          <CardHeader className="space-y-1 pb-4 pt-5 px-4 sm:px-6 sm:pb-6 sm:pt-6">
            <div className="flex flex-col items-center justify-center lg:hidden mb-6">
              <div className="h-16 w-16 rounded-full bg-[#25D366] flex items-center justify-center mb-3">
                <MessageCircle size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#128C7E]">MessageHub</h2>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-[#128C7E]">
              Login to Dashboard
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#128C7E] font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 border-gray-200 focus:border-[#25D366] focus:ring-[#25D366] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-[#128C7E] font-medium"
                  >
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 border-gray-200 focus:border-[#25D366] focus:ring-[#25D366] transition-all"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 px-4 sm:px-6 pb-6">
              <Button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white transition-all duration-300 flex items-center justify-center gap-2 h-11 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
                {!isLoading && (
                  <ArrowRight size={18} className="hidden sm:inline" />
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      {/* ✅ Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}
