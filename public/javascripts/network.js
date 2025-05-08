const diagram = document.querySelector(".network-diagram");
const centerNode = document.querySelector(".center");
const nodes = document.querySelectorAll(".node:not(.center)");

const lines = {
  "right-1": document.getElementById("line-right-1"),
  "right-2": document.getElementById("line-right-2"),
  "left-1": document.getElementById("line-left-1"),
  "left-2": document.getElementById("line-left-2"),
  "left-3": document.getElementById("line-left-3"),
  "left-4": document.getElementById("line-left-4"),
};

function updateLines() {
  const center = document.querySelector(".center").getBoundingClientRect();

  Object.keys(lines).forEach((key) => {
    const node = document.querySelector(`.${key}`).getBoundingClientRect();

    lines[key].setAttribute("x1", center.left + center.width / 2);
    lines[key].setAttribute("y1", center.top + center.height / 2);
    lines[key].setAttribute("x2", node.left + node.width / 2);
    lines[key].setAttribute("y2", node.top + node.height / 2);
    lines[key].setAttribute("y1", center.top + center.height / 2);
    lines[key].setAttribute("x2", node.left + node.width / 2);
  });
}

window.addEventListener("resize", updatePositions);

const diagram = document.querySelector(".network-diagram");

diagramHover(false);

function updatePositions() {
  updateNodePositions();
  updateLineVisibility(false);
  linesVisibility(false);
}

function updatePositions() {
  updateNodes();
  updateLines();
}

function showNodes(show) {
  document.querySelectorAll(".node:not(.center)").forEach((node) => {
    node.style.opacity = show ? 1 : 0;
  });

  document.querySelectorAll(".svg-line").forEach((line) => {
    line.style.strokeDashoffset = show ? 0 : 100;
  });
}

const diagram = document.querySelector(".network-diagram");

document.addEventListener("DOMContentLoaded", () => {
  updatePositions();

  document
    .querySelector(".network-diagram")
    .addEventListener("mouseenter", () => {
      showNodes(true);
    });

  document
    .querySelector(".network-diagram")
    .addEventListener("mouseleave", () => {
      showNodes(false);
    });
});

// Initialize positions on load
updatePositions();
