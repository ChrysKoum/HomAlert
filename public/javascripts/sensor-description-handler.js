document.addEventListener("DOMContentLoaded", function () {
    const defaultDesc = document.getElementById("default-desc");
    const descriptions = document.querySelectorAll(".desc");
    const sensorIcons = document.querySelectorAll(".sensor-icon");
    const defaultIcon = document.querySelector(".sensor-icon[data-index='5']");

    function resetDescriptions(callback) {
        const activeDesc = document.querySelector(".desc.active");
        if (activeDesc) {
            activeDesc.style.transform = "translateX(50px)";
            activeDesc.style.opacity = "0";

            // Wait for animation to complete before hiding
            setTimeout(() => {
                activeDesc.classList.remove("active");
                activeDesc.style.display = "none";
                if (callback) callback(); // Call function after old description hides
            }, 700); // Matches the CSS transition duration
        } else if (callback) {
            callback();
        }
    }

 // Set the default active icon on page load
    if (defaultIcon) {
        defaultIcon.classList.add("active");
        console.log("Default active icon:", defaultIcon);
    }

    sensorIcons.forEach((icon) => {
        icon.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent page jump

            // Remove active class from all icons
            sensorIcons.forEach((icon) => icon.classList.remove("active"));

            // Add active class to the clicked icon
            this.classList.add("active");

            console.log("Active icon updated:", this);

            // Hide all descriptions smoothly before showing new one
            resetDescriptions(() => {
                // Show the clicked sensor's description
                const index = this.getAttribute("data-index");
                const selectedDesc = document.getElementById(`sensor-desc-${index}`);

                if (selectedDesc) {
                    selectedDesc.style.display = "block";
                    setTimeout(() => {
                        selectedDesc.classList.add("active");
                        selectedDesc.style.opacity = "1";
                        selectedDesc.style.transform = "translateX(0)"; // Slide in
                    }, 50);
                }
            });
        });
    });
});