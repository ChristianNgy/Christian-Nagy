import "./styles.css";

// Select all h2 headings and add a click event
const headings = document.querySelectorAll("h2");

headings.forEach((h) => {
  const heading = h as HTMLHeadingElement;
  heading.addEventListener("click", () => {
    // Toggle between two background colors
    if (heading.style.backgroundColor === "yellow") {
      heading.style.backgroundColor = "";
    } else {
      heading.style.backgroundColor = "yellow";
    }
  });
});