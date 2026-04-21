"use client";
import { use } from "react";
import { useActionState } from "react";
import { handleLogin } from "../../actions/auth";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export default function LoginPage({ searchParams }: { searchParams: Promise<{ success?: string; error?: string }> }) {
  const params = use(searchParams);
  const [state, formAction] = useActionState(handleLogin, null);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }}>
      <div style={{
        width: "300px",
        padding: "30px",
        border: "1px solid #333",
        borderRadius: "8px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

        {params.success && (
          <p style={{ color: "green", marginBottom: "10px" }}>{params.success}</p>
        )}
        {params.error && (
          <p style={{ color: "red", marginBottom: "10px" }}>{params.error}</p>
        )}
        {state?.error && (
          <p style={{ color: "red", marginBottom: "10px" }}>{state.error}</p>
        )}

        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
          <SubmitButton />
        </form>

        <p style={{ textAlign: "center", marginTop: "16px" }}>
          No account? <Link href="/signup">Sign Up</Link>
        </p>

        <footer style={{ borderTop: "1px solid #333", paddingTop: "20px", textAlign: "center" }}>
          <div style={{ fontSize: "18px", fontWeight: "900" }}>
            Task<span style={{ color: "#0053b3" }}>8</span>
          </div>
          <p style={{ fontSize: "11px", color: "#666", marginTop: "5px" }}>
            @ Zaid Fareed. All Rights Reserved!
          </p>
        </footer>
      </div>
    </div>
  );
}