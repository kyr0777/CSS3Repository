async function fetchQuote() {
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");

  try {
    // Using a CORS proxy to avoid CORS issues
    const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random"));
    const data = await response.json();
    const quoteData = JSON.parse(data.contents);
    
    if (quoteData && quoteData.length > 0) {
      const quote = quoteData[0].q;
      const author = quoteData[0].a;

      quoteText.textContent = `"${quote}"`;
      quoteAuthor.textContent = `– ${author}`;
    } else {
      throw new Error("No quote data received");
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteText.textContent = "Unable to load quote at the moment.";
    quoteAuthor.textContent = "Please try again later.";
  }
}

// Function to load a new quote (called by button)
function loadNewQuote() {
  document.getElementById("quote-text").textContent = "Loading new quote...";
  document.getElementById("quote-author").textContent = "";
  fetchQuote();
}

// Load initial quote when page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchQuote();
  
  // Slideshow logic
  const slides = [
    "images/slide1.jpg",
    "images/slide2.jpg",
    "images/slide3.jpg"
  ];
  let slideIndex = 0;
  const slideImage = document.getElementById("slide");

  // Only start slideshow if the slide element exists
  if (slideImage) {
    setInterval(() => {
      slideIndex = (slideIndex + 1) % slides.length;
      slideImage.src = slides[slideIndex];
    }, 3000);
  }
});