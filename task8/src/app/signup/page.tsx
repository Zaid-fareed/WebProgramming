import { handleSignup } from "../../actions/auth";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div style={{
      width: "300px",
      margin: "80px auto",
      padding: "30px",
      border: "1px solid #333",
      borderRadius: "8px"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up</h2>

      <form action={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input name="name" type="text" placeholder="Full Name" required />
        <input name="email" type="email" placeholder="Email Address" required />
        <input name="phone" type="tel" placeholder="Phone Number" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>

      <p style={{ textAlign: "center", marginTop: "16px" }}>
        Already have an account? <Link href="/login">Login</Link>
      </p>

      <footer style={{ 
        borderTop: "1px solid #333", 
        paddingTop: "20px", 
        textAlign: "center" 
      }}>
        <div style={{ 
          fontSize: "18px", 
          fontWeight: "900", 
        }}>
          Task<span style={{ color: "#0053b3" }}>8</span>
        </div>
        <p style={{ fontSize: "11px", color: "#666", marginTop: "5px" }}>
          @ Zaid Fareed.All Rights Reserved!
        </p>
      </footer>
    </div>
  );
}