"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Network, Zap, CheckCircle, XCircle } from "lucide-react";

export default function WebHealthChecker() {
  const [url, setUrl] = useState("");
  const [port, setPort] = useState("80");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const checkHealth = async () => {
    setLoading(true);
    setStatus("");
    setResult(null);

    try {
      const response = await fetch(`https://${API_URL}/api/check?url=${url}&port=${port}`);
      const data = await response.json();
      setStatus(data.status);
      setResult(data.status.toLowerCase().includes("up") ? "success" : "error");
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
      setResult("error");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl p-6"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-white flex items-center justify-center mb-4"
        >
          <Network className="mr-2 text-white" />
          Web Health Checker
        </motion.h1>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter website URL"
            className="p-3 text-lg rounded-lg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Port (default 80)"
            className="p-3 text-lg rounded-lg"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />

          <Button
            onClick={checkHealth}
            disabled={loading}
            className={`w-full p-3 text-lg rounded-lg transition-all duration-300 ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <Zap className="mr-2 animate-spin" />
                Checking...
              </div>
            ) : (
              "Check Health"
            )}
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {status && (
          <motion.div
            key="status-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mt-6 max-w-lg w-full p-4 rounded-xl shadow-lg bg-white/30 backdrop-blur-lg text-white text-lg"
          >
            <div className="flex items-center space-x-3">
              {result === "success" ? (
                <CheckCircle className="text-green-400" size={28} />
              ) : (
                <XCircle className="text-red-400" size={28} />
              )}
              <span className="font-medium">{status}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
