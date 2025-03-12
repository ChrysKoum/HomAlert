document.addEventListener("DOMContentLoaded", function () {
    const defaultDesc = document.getElementById("default-desc");
    const descriptions = document.querySelectorAll(".desc");
    const sensorIcons = document.querySelectorAll(".sensor-icon");

    function resetDescriptions() {
        descriptions.forEach((desc) => desc.classList.remove("active"));
    }

    sensorIcons.forEach((icon) => {
        icon.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent page jump

            // Hide all descriptions and reset
            resetDescriptions();

            // Show the clicked sensor's description
            const index = this.getAttribute("data-index");
            const selectedDesc = document.getElementById(`sensor-desc-${index}`);

            if (selectedDesc) {
                selectedDesc.classList.add("active");
            } else {
                defaultDesc.classList.add("active"); // Show default if no match
            }
        });
    });
});