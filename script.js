// Este evento se asegura de que el DOM (la estructura HTML) esté completamente cargado
// antes de ejecutar cualquier script. Es una buena práctica para evitar errores.
document.addEventListener('DOMContentLoaded', () => {

    // --- GESTIÓN DEL TEMA (MODO OSCURO/CLARO) ---

    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = themeToggleBtn.querySelector('i');
    const htmlElement = document.documentElement; // Selecciona la etiqueta <html>

    // Función para aplicar un tema específico (dark/light)
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        // Guardamos la preferencia del usuario en el almacenamiento local del navegador
        localStorage.setItem('theme', theme);

        // Actualizamos el icono del botón
        if (theme === 'dark') {
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
        } else {
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
        }
    };

    // Función para inicializar el tema al cargar la página.
    // Esto evita el "parpadeo" de un tema a otro.
    const initializeTheme = () => {
        // 1. Prioridad: Revisar si el usuario ya eligió un tema manualmente antes.
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
            return; // Salimos de la función si ya hay un tema guardado
        }

        // 2. Si no hay tema guardado, revisamos la preferencia del sistema operativo.
        // `window.matchMedia` nos permite consultar las 'media queries' de CSS desde JS.
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    };

    // Evento de clic para el botón de alternancia de tema
    themeToggleBtn.addEventListener('click', () => {
        // Obtenemos el tema actual del atributo 'data-theme'
        const currentTheme = htmlElement.getAttribute('data-theme');
        // Si el tema actual es 'dark', lo cambiamos a 'light', y viceversa.
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Escuchador para cambios en la preferencia de tema del sistema operativo
    // Esto es útil si el usuario cambia el modo de su OS mientras tiene la página abierta.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Solo cambiamos el tema automáticamente si el usuario no ha hecho una elección manual.
        // Si 'theme' existe en localStorage, significa que el usuario ya eligió, así que no hacemos nada.
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Llamamos a la función para establecer el tema inicial en cuanto la página carga.
    initializeTheme();

});