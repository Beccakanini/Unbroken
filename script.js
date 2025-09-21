
    // Sidebar typewriter effect for the title (no blinking)
    const sidebarTitleEl = document.getElementById("sidebar-title");
    const sidebarTitleText = "UNBROKEN";
    let sidebarTitleIdx = 0;
    let sidebarTypewriterStarted = false;
  
    function typeSidebarTitle() {
      if (sidebarTitleIdx < sidebarTitleText.length) {
        sidebarTitleEl.textContent += sidebarTitleText.charAt(sidebarTitleIdx);
        sidebarTitleIdx++;
        setTimeout(typeSidebarTitle, 90);
      } else {
        // Remove the blinking cursor after typing is done
        sidebarTitleEl.classList.remove('typewriter');
        sidebarTitleEl.style.borderRight = 'none';
      }
    }
  
    // Sidebar open/close logic
    const menuBtn = document.getElementById('menu-btn'); 
const sidebar = document.getElementById('sidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');

// Open sidebar
menuBtn.addEventListener('click', () => {
  sidebar.classList.remove('-translate-x-full');
  if (!sidebarTypewriterStarted) {
    sidebarTitleEl.textContent = "";
    sidebarTitleIdx = 0;
    sidebarTitleEl.classList.add('typewriter');
    typeSidebarTitle();
    sidebarTypewriterStarted = true;
  }
});

// Close with the × button
closeSidebarBtn.addEventListener('click', () => {
  sidebar.classList.add('-translate-x-full');
});

// Close when clicking on any sidebar link
const sidebarLinks = sidebar.querySelectorAll("a");
sidebarLinks.forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.add('-translate-x-full');
  });
});

// Close when clicking outside the sidebar
document.addEventListener("click", (e) => {
  if (
    !sidebar.contains(e.target) && 
    !menuBtn.contains(e.target) && 
    !sidebar.classList.contains('-translate-x-full')
  ) {
    sidebar.classList.add('-translate-x-full');
  }
});

  
    // Hero section typewriter effect (multi-line, spaced, no blinking)
    const heroTypewriterEl = document.getElementById("hero-typewriter");
    const heroLines = [
      "UNBROKEN :",
      "A Story of Resilience and Renewal"
    ];
    let heroLineIdx = 0, heroCharIdx = 0;
  
    function typeHeroTitle() {
      if (heroLineIdx < heroLines.length) {
        if (heroCharIdx < heroLines[heroLineIdx].length) {
          heroTypewriterEl.innerHTML += heroLines[heroLineIdx].charAt(heroCharIdx);
          heroCharIdx++;
          setTimeout(typeHeroTitle, 100);
        } else {
          // Pause after first line, then type second line
          if (heroLineIdx === 0) {
            setTimeout(() => {
              heroTypewriterEl.innerHTML += "<br>";
              heroLineIdx++;
              heroCharIdx = 0;
              setTimeout(typeHeroTitle, 400);
            }, 600); // Pause after "UNBROKEN"
          } else {
            // Done typing all lines, remove blinking cursor
            heroTypewriterEl.classList.remove('typewriter-hero');
            heroTypewriterEl.style.borderRight = 'none';
          }
        }
      }
    }
    window.addEventListener('DOMContentLoaded', () => {
      // Sidebar typewriter resets on open, handled above
      // Hero typewriter
      heroTypewriterEl.innerHTML = "";
      heroLineIdx = 0;
      heroCharIdx = 0;
      heroTypewriterEl.classList.add('typewriter-hero');
      typeHeroTitle();
    });

    // hero video script
    const video = document.getElementById("bgVideo");
    video.playbackRate = 0.65; // 0.5 = half speed, 1 = normal, 2 = double


  // Typewriter effect for the storyText paragraph with UNBROKEN highlighted and pauses at every comma and full stop
  const storyTextEl = document.getElementById("storyText");
  const storyRaw = `UNBROKEN tells the extraordinary story of Zaffar Khan, a community leader whose resilience and determination transformed personal challenges into a beacon of hope for others. Told through the lens of narrator <span class="font-bold">Eric Kagorora</span>, we witness how community support, personal strength, and unwavering faith can overcome any obstacle.`;

  // Highlight "UNBROKEN" uniquely
  const highlightWord = "UNBROKEN";
  const storyHTML = storyRaw.replace(
    highlightWord,
    `<span class="typewriter-highlight">${highlightWord}</span>`
  );

  let storyIdx = 0;
  let isTag = false;
  let tempHTML = "";
  let storyTyped = false;

  function typeStoryText() {
    if (storyIdx < storyHTML.length) {
      let char = storyHTML[storyIdx];
      tempHTML += char;
      storyTextEl.innerHTML = tempHTML;

      // Handle HTML tags so they don't type out visibly
      if (char === "<") isTag = true;
      if (char === ">") isTag = false;

      let delay = 50;
      // Pause longer at every comma or full stop (period)
      if (!isTag && (char === "." || char === ",")) {
        delay = 500;
      }
      storyIdx++;
      setTimeout(typeStoryText, isTag ? 0 : delay);
    } else {
      // Remove the blinking cursor after typing is done
      storyTextEl.style.borderRight = "none";
    }
  }

  // Intersection Observer to trigger typewriter when section is in view
  const storySection = storyTextEl.closest("section");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !storyTyped) {
          storyTextEl.innerHTML = "";
          storyIdx = 0;
          tempHTML = "";
          typeStoryText();
          storyTyped = true;
          obs.unobserve(storySection);
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(storySection);


  function toggleSocials() {
    const socials = document.getElementById('socialLinks');
    socials.classList.toggle('hidden');
  }



  function openModal() {
    document.getElementById("storyModal").classList.remove("hidden");
  }
  function closeModal() {
    document.getElementById("storyModal").classList.add("hidden");
  }
// -------------------------
// Firebase config
// -------------------------
const firebaseConfig = {
  apiKey: "AIzaSyCEJ2r0J3cW2zzHAOkwSKLgmvIKuvLhy-Q",
  authDomain: "unbroken61-a904d.firebaseapp.com",
  projectId: "unbroken61-a904d",
  storageBucket: "unbroken61-a904d.appspot.com",
  messagingSenderId: "382988469809",
  appId: "1:382988469809:web:90f8d6c01738b1a29cb710",
  measurementId: "G-71NFKME0ND"
};

// -------------------------
// Initialize Firebase
// -------------------------
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

// -------------------------
// Google Login (Redirect)
// -------------------------
async function googleLogin() {
  try {
    await auth.signInWithRedirect(provider);
  } catch (error) {
    console.error("Login error:", error);
  }
}

// Handle redirect result when user comes back
auth.getRedirectResult()
  .then((result) => {
    if (result.user) {
      console.log("Logged in as:", result.user.displayName);
      document.getElementById("storyForm").classList.remove("hidden");
      document.getElementById("google-login-btn").classList.add("hidden");
    }
  })
  .catch((error) => {
    console.error("Redirect error:", error);
  });

// -------------------------
// Story submission
// -------------------------
document.getElementById("storyForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const storyText = e.target.story.value;

  if (!auth.currentUser) {
    alert("You must be logged in to submit a story.");
    return;
  }

  try {
    await db.collection("stories").add({
      text: storyText,
      user: auth.currentUser.displayName,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    });

    e.target.reset();
    alert("Story submitted!");
    closeModal();
    loadStories();
  } catch (err) {
    console.error("Error submitting story:", err);
  }
});

  // async function loadStories() {
  // try {
  //   const querySnapshot = await db.collection("stories").orderBy("created", "desc").get();
  //   let output = "";
  //   querySnapshot.forEach((doc) => {
  //     const data = doc.data();
  //     output += `
  //       <article class="break-inside-avoid mb-10 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
  //         <h4 class="font-semibold text-xl text-[#181818] mb-3" style="font-family: 'Montserrat', serif;">
  //           ${data.user || "Anonymous"}
  //         </h4>
  //         <p class="text-gray-700 leading-relaxed text-base">
  //           “${data.text}”
  //         </p>
  //       </article>`;
  //   });

//     // Inject stories into your newspaper-style container
//     document.getElementById("community-stories").innerHTML = output;

//   } catch (error) {
//     console.error("Error loading stories: ", error);
//   }
// }

// Call when page loads
loadStories();
  window.googleLogin = googleLogin;


// ----------------- TAB SWITCHING -----------------
const tabGeneral = document.getElementById("tab-general");
const tabMedia = document.getElementById("tab-media");
const formGeneral = document.getElementById("form-general");
const formMedia = document.getElementById("form-media");
const successMsg = document.getElementById("contact-success");

function activateTab(tab) {
  if (tab === "general") {
    // Activate General
    tabGeneral.classList.add("border-[#B8860B]", "text-gray-900");
    tabGeneral.classList.remove("text-gray-500", "border-transparent");

    tabMedia.classList.remove("border-[#B8860B]", "text-gray-900");
    tabMedia.classList.add("text-gray-500", "border-transparent");

    formGeneral.classList.remove("hidden");
    formMedia.classList.add("hidden");
  }

  if (tab === "media") {
    // Activate Media
    tabMedia.classList.add("border-[#B8860B]", "text-gray-900");
    tabMedia.classList.remove("text-gray-500", "border-transparent");

    tabGeneral.classList.remove("border-[#B8860B]", "text-gray-900");
    tabGeneral.classList.add("text-gray-500", "border-transparent");

    formGeneral.classList.add("hidden");
    formMedia.classList.remove("hidden");
  }
}

// Event listeners
tabGeneral.addEventListener("click", () => activateTab("general"));
tabMedia.addEventListener("click", () => activateTab("media"));

// Default tab
activateTab("general");


// ----------------- FORMSPREE SUBMISSION -----------------
async function handleSubmit(event, formId, endpoint) {
  event.preventDefault();
  const form = document.getElementById(formId);
  const data = new FormData(form);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      form.reset();
      successMsg.classList.remove("hidden");
      setTimeout(() => successMsg.classList.add("hidden"), 5000); // auto-hide after 5s
    } else {
      alert("Oops! Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// Attach to both forms
document.getElementById("form-general").addEventListener("submit", (e) =>
  handleSubmit(e, "form-general", "https://formspree.io/f/xnnbqeba")
);

document.getElementById("form-media").addEventListener("submit", (e) =>
  handleSubmit(e, "form-media", "https://formspree.io/f/xandyrdq")
);



  