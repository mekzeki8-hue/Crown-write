"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AuthTest() {
  const [status, setStatus] = useState<string>("Checking...");
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number | null>(null);
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
        setStatus("✅ Authenticated");
        setUser(data.session.user);
        
        // Fetch credits
        const { data: profile } = await supabase
          .from('profiles')
          .select('credits')
          .eq('id', data.session.user.id)
          .single();
        
        if (profile) {
          setCredits(profile.credits);
        }
      } else {
        setStatus("⚠️ Not logged in");
        setUser(null);
        setCredits(null);
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
      setTimeout(checkConnection, 1000);
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
    <div style={{ padding: 40, maxWidth: 800, margin: "0 auto", fontFamily: "Arial" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <h1 style={{ margin: 0 }}>🧪 Authentication Debug Panel</h1>
        <Link href="/" style={{ color: "#C09A72", textDecoration: "none", fontWeight: 600 }}>← Back Home</Link>
      </div>
      
      {/* Status Card */}
      <div style={{ 
        padding: 24, 
        background: status.includes("✅") ? "#D1FAE5" : status.includes("❌") ? "#FEE2E2" : "#FFF3CD", 
        borderRadius: 12, 
        marginBottom: 24,
        border: "2px solid " + (status.includes("✅") ? "#10B981" : status.includes("❌") ? "#EF4444" : "#F59E0B")
      }}>
        <h3 style={{ marginTop: 0 }}>Connection Status:</h3>
        <p style={{ fontSize: 18, fontWeight: "bold", margin: "10px 0" }}>{status}</p>
        
        {user && (
          <div style={{ marginTop: 20, padding: 15, background: "white", borderRadius: 8 }}>
            <h4 style={{ marginTop: 0 }}>👤 User Info:</h4>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Created:</strong> {new Date(user.created_at).toLocaleString()}</p>
            {credits !== null && (
              <p style={{ fontSize: 18, color: "#10B981", fontWeight: "bold" }}>
                💳 Credits: {credits}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Auth Form */}
      <div style={{ padding: 24, background: "#F9FAFB", borderRadius: 12, marginBottom: 24 }}>
        <h3>🔐 Test Authentication:</h3>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              display: "block", 
              width: "100%", 
              padding: 12, 
              marginBottom: 12,
              border: "1px solid #D1D5DB",
              borderRadius: 8,
              fontSize: 15
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
              padding: 12, 
              marginBottom: 16,
              border: "1px solid #D1D5DB",
              borderRadius: 8,
              fontSize: 15
            }}
            required
          />
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button 
              type="submit"
              style={{ 
                padding: "12px 24px", 
                background: "#10B981", 
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14
              }}
            >
              📝 Sign Up
            </button>
            <button 
              type="button"
              onClick={handleSignIn}
              style={{ 
                padding: "12px 24px", 
                background: "#3B82F6", 
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14
              }}
            >
              🔑 Sign In
            </button>
            <button 
              type="button"
              onClick={handleSignOut}
              style={{ 
                padding: "12px 24px", 
                background: "#EF4444", 
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14
              }}
            >
              🚪 Sign Out
            </button>
            <button 
              type="button"
              onClick={checkConnection}
              style={{ 
                padding: "12px 24px", 
                background: "#6B7280", 
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14
              }}
            >
              🔄 Refresh Status
            </button>
          </div>
        </form>

        {message && (
          <div style={{ 
            padding: 15, 
            background: message.includes("❌") ? "#FEE2E2" : "#D1FAE5",
            borderRadius: 8,
            marginTop: 16,
            border: "1px solid " + (message.includes("❌") ? "#EF4444" : "#10B981")
          }}>
            {message}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div style={{ 
        padding: 24, 
        background: "#FEF3C7", 
        borderRadius: 12,
        fontSize: 14,
        border: "2px solid #F59E0B"
      }}>
        <h4 style={{ marginTop: 0 }}>📋 Setup Checklist:</h4>
        <ol style={{ lineHeight: 1.8 }}>
          <li>✅ Supabase environment variables are set</li>
          <li>⚠️ <strong>Run SQL from database-setup-simple.sql in Supabase</strong></li>
          <li>⚠️ <strong>Configure Authentication in Supabase Dashboard:</strong>
            <ul>
              <li>Authentication → Providers → Email (disable email confirm for testing)</li>
              <li>Authentication → URL Configuration → Add redirect URLs</li>
            </ul>
          </li>
          <li>🧪 Test signup with email/password above</li>
          <li>🎉 If it works, auth is fully configured!</li>
        </ol>
        <p style={{ marginTop: 20, padding: 15, background: "white", borderRadius: 8 }}>
          <strong>📖 Read AUTH_SETUP_GUIDE.md</strong> for detailed instructions!
        </p>
      </div>
    </div>
  );
}
