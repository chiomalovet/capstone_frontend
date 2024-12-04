
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("login-password").value;
  
    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (response.ok && result. accessToken) {
              localStorage.setItem("token", result.accessToken); 
              localStorage.setItem("email", email); 
        
              
              window.location.href = "../taskmanager/taskmanager.html";
      } else {
        alert(result.message || "Login failed"); 
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  });
  
  
  