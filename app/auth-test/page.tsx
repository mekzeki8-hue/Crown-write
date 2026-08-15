"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

export default function AuthTest() {
  const [status, setStatus] = useState<string>("Checking...");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const supabase = createClient();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setStatus("❌ Connection failed: " + error.message);
      } else if (data.session) {
        setStatus("✅ Connected! User: " + data.session.user.email);
      } else {
        setStatus("✅ Connected! No user logged in.");
      }
    } catch (err) {
      setStatus("❌ Error: " + String(err));
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Signing up...");
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage("❌ Signup error: " + error.message);
    } else {
      setMessage("✅ Signup successful! Check your email for verification.");
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Signing in...");
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("❌ Login error: " + error.message);
    } else {
      setMessage("✅ Login successful!");
      checkConnection();
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage("❌ Signout error: " + error.message);
    } else {
      setMessage("✅ Signed out successfully!");
      checkConnection();
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "0 auto", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: 20 }}>🧪 Supabase Auth Test</h1>
      
      <div style={{ 
        padding: 20, 
        background: "#f0f0f0", 
        borderRadius: 8, 
        marginBottom: 30 
      }}>
        <h3>Connection Status:</h3>
        <p style={{ fontSize: 16, fontWeight: "bold" }}>{status}</p>
      </div>

      <div style={{ marginBottom: 30 }}>
        <h3>Test Signup/Login:</h3>
        <form onSubmit={handleSignUp} style={{ marginBottom: 20 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              display: "block", 
              width: "100%", 
              padding: 10, 
              marginBottom: 10,
              border: "1px solid #ccc",
              borderRadius: 4
            }}
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              display: "block", 
              width: "100%", 
              padding: 10, 
              marginBottom: 10,
              border: "1px solid #ccc",
              borderRadius: 4
            }}
            required
          />
          <div style={{ display: "flex", gap: 10 }}>
            <button 
              type="submit"
              style={{ 
                padding: "10px 20px", 
                background: "#10B981", 
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Sign Up
            </button>
            <button 
              type="button"
              onClick={handleSignIn}
              style={{ 
                padding: "10px 20px", 
                background: "#3B82F6", 
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Sign In
            </button>
            <button 
              type="button"
              onClick={handleSignOut}
              style={{ 
                padding: "10px 20px", 
                background: "#EF4444", 
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Sign Out
            </button>
          </div>
        </form>

        {message && (
          <div style={{ 
            padding: 15, 
            background: message.includes("❌") ? "#FEE2E2" : "#D1FAE5",
            borderRadius: 8,
            marginTop: 10
          }}>
            {message}
          </div>
        )}
      </div>

      <div style={{ 
        padding: 20, 
        background: "#FFF3CD", 
        borderRadius: 8,
        fontSize: 14
      }}>
        <h4>📋 Instructions:</h4>
        <ol>
          <li>Make sure you restarted the dev server after adding .env.local</li>
          <li>Try signing up with a test email</li>
          <li>Check if you get a verification email</li>
          <li>Try signing in with the same credentials</li>
          <li>Check the connection status updates</li>
        </ol>
        <p><strong>If signup works ✅</strong> → Your Supabase is configured correctly!</p>
      </div>
    </div>
  );
}
