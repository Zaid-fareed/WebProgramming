import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { handleLogout } from "../../actions/auth";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const name = cookieStore.get("session_name")?.value;
  const email = cookieStore.get("session_email")?.value;

  if (!name || !email) {
    redirect("/login");
    return null;
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // padding: "16px 32px",
        // borderBottom: "1px solid #333"
      }}>
        <h1 style={{ fontSize: "20px" }}>Dashboard</h1>
        <form action={handleLogout} style={{ marginLeft: "auto" }}>
          <button type="submit">Logout</button>
        </form>
      </div>

      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          width: "300px",
          padding: "30px",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <h2 style={{ marginBottom: "16px" }}>Dashboard</h2>
          <p>Welcome, <strong>{name}</strong>!</p>
          <p style={{ color: "#888", fontSize: "14px", marginTop: "8px" }}>
            Logged in as: {email}
          </p>
        </div>
      </div>

      <footer style={{
        borderTop: "1px solid #333",
        paddingTop: "20px",
        textAlign: "center",
        padding: "16px"
      }}>
        <div style={{ fontSize: "18px", fontWeight: "900" }}>
          Task<span style={{ color: "#0053b3" }}>8</span>
        </div>
        <p style={{ fontSize: "11px", color: "#666", marginTop: "5px" }}>
          @ Zaid Fareed. All Rights Reserved!
        </p>
      </footer>

    </div>
  );
}