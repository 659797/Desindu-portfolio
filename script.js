
/* =====================================
   1. PROFESSIONAL TITLE ANIMATION
===================================== */

const titles = [
    "Quality Assurance Professional",
    "Business Analysis Enthusiast",
    "Aspiring Project Manager",
    "Software Engineering Undergraduate"
];

const typingText = document.getElementById("typingText");

let titleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeAnimation() {

    if (!typingText) return;

    const currentTitle = titles[titleIndex];

    if (!deleting) {

        typingText.textContent =
            currentTitle.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentTitle.length) {
            deleting = true;
            setTimeout(typeAnimation, 1600);
            return;
        }

    } else {

        typingText.textContent =
            currentTitle.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {
            deleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }
    }

    setTimeout(typeAnimation, deleting ? 35 : 75);
}

if (typingText) {
    typeAnimation();
}


/* =====================================
   2. MOBILE NAVIGATION
===================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const isOpen = navLinks.classList.contains("show");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.innerHTML = isOpen
            ? '<i data-lucide="x"></i>'
            : '<i data-lucide="menu"></i>';

        if (window.lucide) {
            lucide.createIcons();
        }
    });

    // Close mobile menu after clicking a link

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.innerHTML =
                '<i data-lucide="menu"></i>';

            if (window.lucide) {
                lucide.createIcons();
            }
        });
    });
}


/* =====================================
   3. PROJECT DATABASE
===================================== */

const projects = [

    // ---------------------------------
    // PROJECT 01 - Q-TRACK
    // ---------------------------------

    {
        id: 1,

        title: "Q-Track",

        category: "qa",

        categoryName: "QUALITY ASSURANCE",

        description:
            "A web-based QA management system designed to manage software requirements, test scenarios, test execution, bug reports and requirements traceability.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        github:
            "https://github.com/659797/Q-Track",

        demo:
            "https://659797.github.io/Q-Track/",

        image:
            "assets/projects/qtrack.png",

        icon: "Q"
    },


    // ---------------------------------
    // PROJECT 02 - FITZONE
    // ---------------------------------

    {
        id: 2,

        title: "FitZone Gym QA Dashboard",

        category: "qa",

        categoryName: "QUALITY ASSURANCE",

        description:
            "A quality assurance dashboard project demonstrating software testing management, dashboard presentation and organized QA documentation.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        github:
            "https://github.com/659797/FitZone-Gym-QA-dashboard",

        demo:
            "https://659797.github.io/FitZone-Gym-QA-dashboard/",

        image:
            "assets/projects/fitzone.png",

        icon: "F"
    },


    // ---------------------------------
    // PROJECT 03 - MANGO TREE
    // ---------------------------------

    {
        id: 3,

        title: "Mango Tree Restaurant",

        category: "development",

        categoryName: "WEB DEVELOPMENT",

        description:
            "A modern restaurant website featuring a responsive homepage, food menu, menu categories, interactive shopping cart and restaurant information.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        github:
            "https://github.com/659797/Mango-Tree-Restraurant",

        demo:
            "https://659797.github.io/Mango-Tree-Restraurant/",

        image:
            "assets/projects/mangotree.png",

        icon: "M"
    }

];


/* =====================================
   4. DISPLAY PROJECTS
===================================== */

const projectsGrid = document.getElementById("projectsGrid");

function displayProjects(filter = "all") {

    if (!projectsGrid) return;

    projectsGrid.innerHTML = "";

    const filteredProjects = projects.filter(project => {

        return filter === "all" ||
               project.category === filter;

    });


    // No projects message

    if (filteredProjects.length === 0) {

        projectsGrid.innerHTML = `
            <div class="no-projects">
                <p>No projects available in this category yet.</p>
            </div>
        `;

        return;
    }


    filteredProjects.forEach(project => {

        const projectCard = document.createElement("article");

        projectCard.className = "project-card";


        // Project image

        const imageContent = project.image

            ? `
                <img
                    src="${project.image}"
                    alt="${project.title} project screenshot"
                    loading="lazy"
                    onerror="
                        this.style.display='none';
                        this.nextElementSibling.style.display='flex';
                    "
                >

                <div class="project-placeholder"
                     style="display:none;">
                    ${project.icon}
                </div>
              `

            : `
                <div class="project-placeholder">
                    ${project.icon}
                </div>
              `;


        // Technology tags

        const technologyTags = project.technologies
            .map(technology => {

                return `<span>${technology}</span>`;

            })
            .join("");


        // GitHub button

        const githubLink = project.github

            ? `
                <a
                    href="${project.github}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i data-lucide="github"></i>
                    GitHub
                </a>
              `

            : "";


        // Live demo button

        const demoLink = project.demo

            ? `
                <a
                    href="${project.demo}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i data-lucide="external-link"></i>
                    Live Demo
                </a>
              `

            : "";


        // Complete project card

        projectCard.innerHTML = `

            <div class="project-image">

                ${imageContent}

            </div>


            <div class="project-info">

                <span class="project-category">
                    ${project.categoryName}
                </span>


                <h3>
                    ${project.title}
                </h3>


                <p>
                    ${project.description}
                </p>


                <div class="project-tags">

                    ${technologyTags}

                </div>


                <div class="project-links">

                    ${githubLink}

                    ${demoLink}

                </div>

            </div>

        `;


        projectsGrid.appendChild(projectCard);

    });


    // Initialize icons after project rendering

    if (window.lucide) {

        lucide.createIcons();

    }

}


// Display all projects when page loads

displayProjects();


/* =====================================
   5. PROJECT FILTERING
===================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {


        // Remove active class from all filters

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        // Activate selected filter

        button.classList.add("active");


        // Get selected category

        const selectedFilter = button.dataset.filter;


        // Display filtered projects

        displayProjects(selectedFilter);

    });

});


/* =====================================
   6. NAVIGATION ACTIVE SECTION
===================================== */

const sections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-link");


if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navigationLinks.forEach(link => {

                        link.classList.remove("active");


                        if (
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        ) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },

        {
            rootMargin: "-30% 0px -60% 0px"
        }

    );


    // Observe all sections

    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* =====================================
   7. AUTOMATIC COPYRIGHT YEAR
===================================== */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =====================================
   8. INITIALIZE LUCIDE ICONS
===================================== */

if (window.lucide) {

    lucide.createIcons();

}
