document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirm_password = document.getElementById("confirm_password").value;
  
    try {
      const response = await fetch("http://localhost:8000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirm_password })
      });
      const result = await response.json();
      if (response.ok) {
      
      
      } else {
        alert(result.message || "Registration successful!");
  
        window.location.href = "../login/login.html";
      
        
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred. Please check your internet connection and try again.");
    }
    }
  );
  
  
