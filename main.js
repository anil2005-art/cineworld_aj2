const moviesByCity = {
  Mumbai: ['Kannappa', 'Vysanasametham Bandhumithradhikal'],
  Delhi: ['Sitaare Zameen Par'],
  Hyderabad: ['F1: The Movie'],
  Kochi: ['Ronth', 'Jurassic World: Rebirth']
};

  const ottMovies = {
    avengers: {
      title: "Avengers Endgame",
      videoUrl: "https://www.youtube.com/embed/TcMBFSGVi1c"
    },
    kgf2: {
      title: "KGF 2",
      videoUrl: "https://www.youtube.com/embed/JKa05nyUmuQ"
    },
   Jurassic: {  // ← this is the key name
    title: "Jurassic World: Rebirth",
    videoUrl: "https://www.youtube.com/embed/jan5CFWs9ic"
  }
  };

let isSignup = false;

function toggleAuth(signup) {
  isSignup = signup;
  document.getElementById("authTitle").innerText = signup ? "Sign Up" : "Login";
  document.getElementById("authToggle").innerHTML = signup
    ? `Already have an account? <a href="#" onclick="toggleAuth(false)">Login</a>`
    : `Don't have an account? <a href="#" onclick="toggleAuth(true)">Sign Up</a>`;
}

function handleAuth() {
  const username = document.getElementById("authUsername").value.trim();
  const password = document.getElementById("authPassword").value.trim();

  if (!username || !password) {
    alert("⚠️ Please fill in both fields.");
    return;
  }

  if (isSignup) {
    localStorage.setItem(`user_${username}`, password);
    alert("✅ Signup successful! Please login.");
    toggleAuth(false);
  } else {
    const storedPass = localStorage.getItem(`user_${username}`);
    if (storedPass === password) {
      localStorage.setItem("loggedInUser", username);
      showMainApp(username);
    } else {
      alert("❌ Invalid username or password!");
    }
  }
}

function showMainApp(user) {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("mainApp").style.display = "block";
  document.getElementById("logoText").innerText = `CINEWORLD AJ - Welcome, ${user}`;
  document.getElementById("logoutBtn").style.display = "inline";
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

function searchMovies() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const allCards = document.querySelectorAll('.movie-card');

  allCards.forEach(card => {
    const title = card.querySelector('h3').innerText.toLowerCase();
    card.style.display = title.includes(input) ? 'block' : 'none';
  });
}

function filterMovies() {
  const city = document.getElementById('citySelect').value;
  const cards = document.querySelectorAll('#book .movie-card');

  cards.forEach(card => {
    const title = card.querySelector('h3').innerText;
    card.style.display = moviesByCity[city]?.includes(title) ? 'block' : 'none';
  });
}

function bookTicket(movieName) {
  alert(`🎟 Ticket booked for "${movieName}"! Enjoy your movie!`);
}

function watchNow(movieName) {
  const video = Object.values(ottMovies).find(m => m.title === movieName);
  if (video) {
    window.open(video.videoUrl, "_blank");
  } else {
    alert("⚠️ Video link not available!");
  }
}

window.onload = function () {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    showMainApp(user);
  }

  const citySelect = document.getElementById("citySelect");
  Object.keys(moviesByCity).forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.innerText = city;
    citySelect.appendChild(option);
  });
};
