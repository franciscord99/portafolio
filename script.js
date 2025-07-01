document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section');

  // Efecto de achicar el header al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }

    activateNavLink();
  });

  // Activar link de navegación según la sección en pantalla
  function activateNavLink() {
    let scrollPos = window.scrollY + 100; // Compensar header fijo

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Scroll suave al hacer clic en nav
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });

        // Cerrar el menú en móvil
        if (window.innerWidth <= 768) {
          nav.classList.remove('show');
        }
      }
    });
  });

  // Toggle del menú en móvil
  toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });

  // Cerrar el menú si se cambia el tamaño de pantalla
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      nav.classList.remove('show');
    }
  });

  // Activar nav link al cargar
  activateNavLink();
});

const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // solo una vez
    }
  });
}, {
  threshold: 0.15
});

fadeEls.forEach(el => observer.observe(el));

// Animación en cascada para íconos del footer
const footerIcons = document.querySelectorAll('.footer-icon');

const cascadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      footerIcons.forEach((icon, i) => {
        setTimeout(() => {
          icon.classList.add('visible');
        }, i * 150); // 150ms entre cada ícono
      });
      cascadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3
});

// Usamos el primer ícono como disparador
if (footerIcons.length > 0) {
  cascadeObserver.observe(footerIcons[0]);
}

const translations = {
  es: {
    "sobre-mi-title": "Sobre mí",
    "sobre-mi-text": "¡Hola! Soy Francisco Ramos D’Uva, tengo 25 años y soy Técnico Superior en Programación con experiencia en ventas y una gran pasión por la tecnología. Después de varios años trabajando cara a cara con clientes, decidí dar un giro a mi carrera y enfocarme en el desarrollo web. Actualmente me especializo en crear sitios web modernos y funcionales con lenguajes como HTML, CSS y JavaScript, con un enfoque en la experiencia del usuario (UX/UI). Cuento con la disposición de aprender constantemente y trabajar en proyectos que representen un desafío, buscando oportunidades que me permitan seguir creciendo como desarrollador, aportando soluciones prácticas y bien pensadas.",

    "formacion-title": "Formación",
    "formacion-text": "Técnico Superior en Programación, egresado de Teclab en 2023. Durante mi formación adquirí conocimientos sólidos en desarrollo web, bases de datos, lógica de programación y metodologías ágiles. Actualmente estoy perfeccionandome en un curso sobre diseño UX/UI de la Escuela Británica de Artes Creativas y Tecnología (EBAC LMS).",

    "experiencia-title": "Experiencia Laboral",
    "experiencia-text": "Cuento con varios años de experiencia en ventas presenciales en Implementos Industriales SRL, desempeñándome como Vendedor. Este rol me permitió desarrollar habilidades clave como: Comunicación efectiva Empatía con el cliente Capacidad de resolver problemas de forma ágil Gracias a esta trayectoria aprendí a trabajar bajo presión, en equipo y con foco en resultados. Estas competencias complementan hoy mi perfil como desarrollador, aportando una mirada integral a los proyectos en los que participo.",

    "proyectos-title": "Proyectos",
    "proyectos-text": "A lo largo de mi formación y aprendizaje autodidacta he desarrollado varios proyectos personales que me han permitido poner en práctica mis conocimientos en desarrollo web. Entre ellos se destacan pequeñas landing pages responsivas y componentes interactivos con JavaScript. Cada proyecto fue una oportunidad para mejorar mis habilidades en diseño, estructura del código y experiencia de usuario. Actualmente sigo ampliando mi portafolio con nuevas ideas, explorando herramientas modernas y buenas prácticas de desarrollo. Mi objetivo es aplicar todo lo aprendido en proyectos reales que generen impacto.",

    "idiomas-title": "Idiomas",
    "idiomas-text": "Nativo Nivel B1 – Básico Nivel B1 – Básico",

    "contacto-text": "Conectá conmigo",
    // Agrega más claves según tu HTML
  },
  en: {
    "sobre-mi-title": "About Me",
    "sobre-mi-text": "Hi! I'm Francisco Ramos D’Uva...",

    "formacion-title": "Education",
    "formacion-text": "Senior Technician in Programming...",

    "experiencia-title": "Experience",
    "experiencia-text": "I have several years of experience...",

    "proyectos-title": "Projects",
    "proyectos-text": "",

    "idiomas-title": "Languages",
    "idiomas-text": "",

    "contacto-text": "Connect with me",
  },
  it: {
    "sobre-mi-title": "Su di me",
    "sobre-mi-text": "Ciao! Sono Francisco Ramos D’Uva...",

    "formacion-title": "Formazione",
    "formacion-text": "Tecnico Superiore in Programmazione...",

    "experiencia-title": "Esperienza",
    "experiencia-text": "Ho diversi anni di esperienza...",

    "proyectos-title": "Progetti",
    "proyectos-text": "",

    "idiomas-title": "Lingue",
    "idiomas-text": "",

    "contacto-text": "Connettiti con me",
  }
};

function cambiarIdioma(lang) {
  const textos = translations[lang];
  for (const key in textos) {
    const el = document.getElementById(key);
    if (el) el.innerHTML = textos[key];
  }
}

document.querySelectorAll('.language-selector button').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    cambiarIdioma(lang);
  });
});

const traducciones = {
  es: {
    "nav.sobreMi": "Sobre mí",
    "nav.formacion": "Formación",
    "nav.experiencia": "Experiencia",
    "nav.proyectos": "Proyectos",
    "nav.idiomas": "Idiomas",
    "nav.contacto": "Contacto",
    "sobreMi.titulo": "Sobre mí",
    "sobreMi.p1": "¡Hola! Soy Francisco Ramos D’Uva, tengo 25 años y soy Técnico Superior en Programación con experiencia en ventas y una gran pasión por la tecnología.",
    "sobreMi.p2": "Después de varios años trabajando cara a cara con clientes, decidí dar un giro a mi carrera y enfocarme en el desarrollo web.",
    "sobreMi.p3": "Actualmente me especializo en crear sitios web modernos y funcionales con lenguajes como HTML, CSS y JavaScript, con un enfoque en la experiencia del usuario (UX/UI).",
    "sobreMi.p4": "Cuento con la disposición de aprender constantemente y trabajar en proyectos que representen un desafío, buscando oportunidades que me permitan seguir creciendo como desarrollador, aportando soluciones prácticas y bien pensadas.",
    "footer.texto": "Conectá conmigo",
    "header.subtitulo": "Programador | Diseñador Web",
    "formacion.titulo": "Formación",
    "formacion.p1": "Técnico Superior en Programación, egresado de Teclab en 2023.",
    "formacion.p2": "Durante mi formación adquirí conocimientos sólidos en desarrollo web, bases de datos, lógica de programación y metodologías ágiles.",
    "formacion.p3": "Actualmente estoy perfeccionandome en un curso sobre diseño UX/UI de la Escuela Británica de Artes Creativas y Tecnología (EBAC LMS).",
    "experiencia.titulo": "Experiencia Laboral",
    "experiencia.p1": "Cuento con varios años de experiencia en ventas presenciales en Implementos Industriales SRL , desempeñándome como Vendedor. Este rol me permitió desarrollar habilidades clave como:",
    "experiencia.li1": "● Comunicación efectiva",
    "experiencia.li2": "● Empatía con el cliente",
    "experiencia.li3": "● Capacidad de resolver problemas de forma ágil",
    "experiencia.p2": "Gracias a esta trayectoria aprendí a trabajar bajo presión, en equipo y con foco en resultados.",
    "experiencia.p3": "Estas competencias complementan hoy mi perfil como desarrollador, aportando una mirada integral a los proyectos en los que participo.",
    "proyectos.titulo": "Proyectos",
    "proyectos.p1": "A lo largo de mi formación y aprendizaje autodidacta he desarrollado varios proyectos personales que me han permitido poner en práctica mis conocimientos en desarrollo web.",
    "proyectos.p2": "Entre ellos se destacan pequeñas landing pages responsivas y componentes interactivos con JavaScript. Cada proyecto fue una oportunidad para mejorar mis habilidades en diseño, estructura del código y experiencia de usuario.",
    "proyectos.p3": "Actualmente sigo ampliando mi portafolio con nuevas ideas, explorando herramientas modernas y buenas prácticas de desarrollo. Mi objetivo es aplicar todo lo aprendido en proyectos reales que generen impacto.",
    "proyectos.h3": "Algunos de mis Diseños",
    "proyectos.p4": "Web de Gimnasio",
    "proyectos.p5": "APP Mobile de Transporte público",
    "idiomas.titulo": "Idiomas",
    "idiomas.tituloEs": "Español",
    "idiomas.p1": "Nativo",
    "idiomas.tituloIt": "Italiano",
    "idiomas.p2": "Nivel B1 – Básico",
    "idiomas.tituloIn": "Inglés",
    "idiomas.p3": "Nivel B1 – Básico",
    "contacto.p1": "Conectá conmigo",
  },

  en: {
    "nav.sobreMi": "About Me",
    "nav.formacion": "Education",
    "nav.experiencia": "Experience",
    "nav.proyectos": "Projects",
    "nav.idiomas": "Languages",
    "nav.contacto": "Contact",
    "sobreMi.titulo": "About Me",
    "sobreMi.p1": "Hi! I'm Francisco Ramos D’Uva, I'm 25 years old and a Senior Technician in Programming with experience in sales and a strong passion for technology.",
    "sobreMi.p2": "After several years of working face-to-face with clients, I decided to take a turn in my career and focus on web development.",
    "sobreMi.p3": "Currently, I specialize in creating modern and functional websites using languages like HTML, CSS, and JavaScript, with a focus on user experience (UX/UI).",
    "sobreMi.p4": "I am eager to continuously learn and work on challenging projects, seeking opportunities that allow me to keep growing as a developer and contribute with practical and well-thought-out solutions.",
    "footer.texto": "Connect with me",
    "header.subtitulo": "Web Developer | UI Designer",
    "formacion.titulo": "Education",
    "formacion.p1": "Senior Technician in Programming, graduated from Teclab in 2023.",
    "formacion.p2": "During my studies, I acquired solid knowledge in web development, databases, programming logic, and agile methodologies.",
    "formacion.p3": "I am currently improving my skills through a UX/UI design course at the Escuela Británica de Artes Creativas y Tecnología (EBAC LMS).",
    "experiencia.titulo": "Experience",
    "experiencia.p1": "I have several years of experience in face-to-face sales at Implementos Industriales SRL, working as a Salesperson. This role allowed me to develop key skills such as:",
    "experiencia.li1": "● Effective communication",
    "experiencia.li2": "● Empathy with the client",
    "experiencia.li3": "● Ability to solve problems quickly",
    "experiencia.p2": "Thanks to this experience, I learned to work under pressure, in teams, and with a strong focus on results.",
    "experiencia.p3": "These skills now complement my profile as a developer, providing a well-rounded perspective to the projects I participate in.",
    "proyectos.titulo": "Projects",
    "proyectos.p1": "Throughout my formal education and self-taught learning, I have developed several personal projects that allowed me to put my web development knowledge into practice.",
    "proyectos.p2": "Among them are responsive landing pages and interactive components using JavaScript. Each project was an opportunity to improve my skills in design, code structure, and user experience.",
    "proyectos.p3": "I am currently expanding my portfolio with new ideas, exploring modern tools and best development practices. My goal is to apply everything I’ve learned to real-world projects that create impact. Some of my works include:",
    "proyectos.h3": "Some of my Designs",
    "proyectos.p4": "Gym Website Designs",
    "proyectos.p5": "Public Transport Mobile App",
    "idiomas.titulo": "Languages",
    "idiomas.tituloEs": "Spanish",
    "idiomas.p1": "Native",
    "idiomas.tituloIt": "Italian",
    "idiomas.p2": "Level B1 – Basic",
    "idiomas.tituloIn": "English",
    "idiomas.p3": "Level B1 – Basic",
    "contacto.p1": "Contact me",
  },
  
  it: {
    "nav.sobreMi": "Su di me",
    "nav.formacion": "Formazione",
    "nav.experiencia": "Esperienza",
    "nav.proyectos": "Progetti",
    "nav.idiomas": "Lingue",
    "nav.contacto": "Contatto",
    "sobreMi.titulo": "Su di me",
    "sobreMi.p1": "Ciao! Sono Francisco Ramos D’Uva, ho 25 anni e sono un Tecnico Superiore in Programmazione con esperienza nelle vendite e una grande passione per la tecnologia.",
    "sobreMi.p2": "Dopo diversi anni di lavoro a contatto diretto con i clienti, ho deciso di cambiare direzione nella mia carriera e dedicarmi allo sviluppo web.",
    "sobreMi.p3": "Attualmente mi specializzo nella creazione di siti web moderni e funzionali utilizzando linguaggi come HTML, CSS e JavaScript, con un'attenzione particolare all'esperienza utente (UX/UI).",
    "sobreMi.p4": "Sono motivato ad apprendere continuamente e a lavorare su progetti stimolanti, cercando opportunità che mi permettano di crescere come sviluppatore e contribuire con soluzioni pratiche e ben pensate.",
    "footer.texto": "Connettiti con me",
    "header.subtitulo": "Sviluppatore Web | Designer UI",
    "formacion.titulo": "Formazione",
    "formacion.p1": "Tecnico Superiore in Programmazione, diplomato presso Teclab nel 2023.",
    "formacion.p2": "Durante la mia formazione ho acquisito solide conoscenze nello sviluppo web, nelle basi di dati, nella logica di programmazione e nelle metodologie agili.",
    "formacion.p3": "Attualmente sto perfezionando le mie competenze con un corso di design UX/UI presso la Escuela Británica de Artes Creativas y Tecnología (EBAC LMS).",
    "experiencia.titulo": "Esperienza",
    "experiencia.p1": "Ho diversi anni di esperienza nelle vendite presenziali presso Implementos Industriales SRL, dove ho lavorato come Venditore. Questo ruolo mi ha permesso di sviluppare competenze chiave come:",
    "experiencia.li1": "● Comunicazione efficace",
    "experiencia.li2": "● Empatia con il cliente",
    "experiencia.li3": "● Capacità di risolvere problemi in modo rapido",
    "experiencia.p2": "Grazie a questa esperienza, ho imparato a lavorare sotto pressione, in team e con un forte orientamento ai risultati.",
    "experiencia.p3": "Queste competenze completano oggi il mio profilo come sviluppatore, offrendo una visione completa ai progetti a cui partecipo.",
    "proyectos.titulo": "Progetti",
    "proyectos.p1": "Nel corso della mia formazione e apprendimento da autodidatta, ho realizzato diversi progetti personali che mi hanno permesso di mettere in pratica le mie conoscenze nello sviluppo web.",
    "proyectos.p2": "Tra questi spiccano landing page responsive e componenti interattivi realizzati con JavaScript. Ogni progetto è stato un'opportunità per migliorare le mie competenze in design, struttura del codice ed esperienza utente.",
    "proyectos.p3": "Attualmente sto ampliando il mio portfolio con nuove idee, esplorando strumenti moderni e buone pratiche di sviluppo. Il mio obiettivo è applicare tutto ciò che ho imparato in progetti reali che abbiano un impatto. Alcuni dei miei lavori includono:",
    "proyectos.h3": "Alcuni dei miei Progetti",
    "proyectos.p4": "Design di siti web per palestre",
    "proyectos.p5": "App mobile per il trasporto pubblico",
    "idiomas.titulo": "Lingue",
    "idiomas.tituloEs": "Spagnolo",
    "idiomas.p1": "Nativo",
    "idiomas.tituloIt": "Italiano",
    "idiomas.p2": "Livello B1 – Base",
    "idiomas.tituloIn": "Inglese",
    "idiomas.p3": "Livello B1 – Base",
    "contacto.p1": "Contattami",
  }
};

function cambiarIdioma(idioma) {
  const elementos = document.querySelectorAll('[data-i18n]');
  elementos.forEach(el => {
    const clave = el.getAttribute('data-i18n');
    if (traducciones[idioma][clave]) {
      el.innerText = traducciones[idioma][clave];
    }
  });
}

document.querySelectorAll('.language-selector button').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    cambiarIdioma(lang);
  });
});
