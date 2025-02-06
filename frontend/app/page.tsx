"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Network, Wifi, WifiOff, Zap } from "lucide-react";

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
      setStatus(`Error checking status: ${error instanceof Error ? error.message : "Unknown error"}`);
      setResult("error");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="web-health-checker"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Network className="mr-2" />
          Web Health Checker
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Input
            type="text"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Input
            type="text"
            placeholder="Port (default 80)"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </motion.div>

        <Button
          onClick={checkHealth}
          disabled={loading}
          className={`w-full ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} transition-colors duration-300`}
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
      </motion.div>

      <AnimatePresence>
        {status && (
          <motion.div
            key="status-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="status-container mt-4 max-w-md w-full"
          >
            <div
              className={`status text-center font-semibold text-lg flex items-center justify-center ${
                result === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {result === "success" ? <Wifi className="mr-2" /> : <WifiOff className="mr-2" />}
              {status}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}