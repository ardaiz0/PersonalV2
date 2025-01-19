const skillClasses = [
  "skill-btn-softblue",
  "skill-btn-softgreen",
  "skill-btn-yellow",
  "skill-btn-blue",
  "skill-btn-red",
  "skill-btn-indigo",
  "skill-btn-orange",
  "skill-btn-white",
  "skill-btn-green"
];

const restrictedRedIds = ["skill-1", "skill-4", "skill-7"];
const shuffledClasses = skillClasses.sort(() => Math.random() - 0.5);

for (let i = 1; i <= 9; i++) {
  const skillDiv = document.getElementById(`skill-${i}`);
    
  if (skillDiv) {
    skillDiv.classList.forEach(className => {
      if (className.startsWith("skill-btn-")) {
        skillDiv.classList.remove(className);
      }
    });
    
    let selectedClass;
    
    for (let j = 0; j < shuffledClasses.length; j++) {
      const potentialClass = shuffledClasses[j];      
      if (restrictedRedIds.includes(`skill-${i}`) && potentialClass === "skill-btn-red") {
        continue;
      }
      selectedClass = potentialClass;
      shuffledClasses.splice(j, 1);
      break;
    }
    
    if (selectedClass) {
      skillDiv.classList.add(selectedClass);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Initial animation for first 4 steps
  anime({
    targets: ['#step-1', '#step-2', '#step-3', '#step-4'],
    opacity: [0, 1],
    duration: 500,
    easing: 'easeOutQuad',
    delay: anime.stagger(0),
  });

  const steps = document.querySelectorAll('#step-5, #step-6, #step-1, #step-2, #step-3, #step-4');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutQuad',
        });
      } else {
        entry.target.style.opacity = 0;
      }
    });
  }, { threshold: 0.2 });

  steps.forEach((step) => observer.observe(step));
});