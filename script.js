// Función para cargar componentes HTML
function loadComponent(file, elementId) {
  fetch(file)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error al cargar ${file}: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = html;

        // Inicializar menú hamburguesa después de cargar el header
        if (elementId === "header-placeholder") {
          setTimeout(() => {
            initMobileMenu();
          }, 100);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Inicializar menú móvil
function initMobileMenu() {
  const burgerMenu = document.getElementById("burgerMenu");
  const navCenter = document.querySelector(".nav-center-container");
  const navSocial = document.querySelector(".nav-social");

  if (!burgerMenu || !navCenter) return;

  // Abrir/cerrar menú hamburguesa
  burgerMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("active");
    navCenter.classList.toggle("mobile-active");

    if (navSocial) {
      navSocial.classList.toggle("mobile-active");
    }

    // Prevenir scroll del body cuando el menú está abierto
    document.body.style.overflow = navCenter.classList.contains("mobile-active")
      ? "hidden"
      : "";
  });

  // Menús desplegables en móvil
  const dropdownParents = document.querySelectorAll(".has-dropdown");

  dropdownParents.forEach((parent) => {
    const dropdownLink = parent.querySelector("a");
    const arrow = dropdownLink.querySelector(".dropdown-arrow");

    dropdownLink.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();

        const dropdown = this.nextElementSibling;
        const isActive = dropdown.classList.contains("active");

        // Cerrar otros dropdowns
        document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
          if (menu !== dropdown) {
            menu.classList.remove("active");
            const otherArrow =
              menu.parentElement.querySelector(".dropdown-arrow");
            if (otherArrow) {
              otherArrow.style.transform = "rotate(0deg)";
            }
          }
        });

        // Alternar este dropdown
        dropdown.classList.toggle("active");

        // Rotar flecha
        if (arrow) {
          arrow.style.transform = dropdown.classList.contains("active")
            ? "rotate(180deg)"
            : "rotate(0deg)";
        }
      }
    });
  });

  // Cerrar menú al hacer clic en enlace (solo móvil)
  const navLinks = document.querySelectorAll(
    ".nav-links a:not(.has-dropdown > a)"
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        burgerMenu.classList.remove("active");
        navCenter.classList.remove("mobile-active");

        if (navSocial) {
          navSocial.classList.remove("mobile-active");
        }

        // Cerrar todos los dropdowns
        document.querySelectorAll(".dropdown-menu").forEach((dropdown) => {
          dropdown.classList.remove("active");
        });

        // Resetear flechas
        document.querySelectorAll(".dropdown-arrow").forEach((arrow) => {
          arrow.style.transform = "rotate(0deg)";
        });

        // Restaurar scroll
        document.body.style.overflow = "";
      }
    });
  });

  // Cerrar menú al hacer clic fuera (solo móvil)
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth <= 768 &&
      navCenter.classList.contains("mobile-active") &&
      !e.target.closest(".navbar") &&
      !e.target.closest(".nav-center-container") &&
      !e.target.closest(".nav-social")
    ) {
      burgerMenu.classList.remove("active");
      navCenter.classList.remove("mobile-active");

      if (navSocial) {
        navSocial.classList.remove("mobile-active");
      }

      document.querySelectorAll(".dropdown-menu").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });

      document.querySelectorAll(".dropdown-arrow").forEach((arrow) => {
        arrow.style.transform = "rotate(0deg)";
      });

      document.body.style.overflow = "";
    }
  });

  // Efecto scroll en navbar
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    const logo = document.querySelector(".logo img");

    if (navbar && logo) {
      if (window.scrollY > 50) {
        navbar.style.padding = "10px 5%";
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
        logo.style.height = "45px";
      } else {
        navbar.style.padding = "15px 5%";
        navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
        logo.style.height = "50px";
      }
    }
  });

  // Cerrar menú al redimensionar a desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      burgerMenu.classList.remove("active");
      navCenter.classList.remove("mobile-active");

      if (navSocial) {
        navSocial.classList.remove("mobile-active");
      }

      document.querySelectorAll(".dropdown-menu").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });

      document.querySelectorAll(".dropdown-arrow").forEach((arrow) => {
        arrow.style.transform = "rotate(0deg)";
      });

      document.body.style.overflow = "";
    }
  });
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  // Solo cargar si existen los placeholders
  if (document.getElementById("header-placeholder")) {
    loadComponent("header.html", "header-placeholder");
  }

  if (document.getElementById("footer-placeholder")) {
    loadComponent("footer.html", "footer-placeholder");
  }

  // Inicializar efectos de hover para cursos (siempre)
  const tarjetasCurso = document.querySelectorAll(".tarjeta-curso");
  tarjetasCurso.forEach((tarjeta) => {
    tarjeta.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    tarjeta.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});
