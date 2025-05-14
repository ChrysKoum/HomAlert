document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.querySelector(".btn-outline-primary");
    const signUpButton = document.querySelector(".btn-primary");

    // Helper function to reset styles
    const resetStyles = () => {
        // Reset Sign In button to its original state
        signInButton.style.backgroundColor = "";
        signInButton.style.color = "";
        signInButton.style.border = "";

        // Reset Sign Up button to its original state
        signUpButton.style.backgroundColor = "";
        signUpButton.style.color = "";
        signUpButton.style.border = "";
    };

    // Add hover event for Sign In button
    signInButton.addEventListener("mouseenter", () => {
        resetStyles(); // Reset both buttons first
        signUpButton.style.backgroundColor = "white"; // Mimic non-hover Sign In style
        signUpButton.style.color = "blue";
        signUpButton.style.border = "1px solid #2A70FF";
    });

    signInButton.addEventListener("mouseleave", resetStyles);

    // Add hover event for Sign Up button
    signUpButton.addEventListener("mouseenter", () => {
        resetStyles(); // Reset both buttons first
        signInButton.style.backgroundColor = "blue"; // Mimic non-hover Sign Up style
        signInButton.style.color = "white";
        signInButton.style.border = "1px solid blue";
    });

    signUpButton.addEventListener("mouseleave", resetStyles);
});
