document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost/codeigniter/index.php/libros';

    // Referencias a los elementos del DOM
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const librosTableBody = document.getElementById('librosTable').getElementsByTagName('tbody')[0];
    const buscarForm = document.getElementById('buscarForm');
    const agregarForm = document.getElementById('agregarForm');
    const actualizarForm = document.getElementById('actualizarForm');
    const borrarForm = document.getElementById('borrarForm');

    // Manejar la navegación entre secciones
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(this.dataset.section).classList.add('active');
            if (this.dataset.section === 'catalogo') {
                loadCatalog();
            }
        });
    });

    // Cargar el catálogo de libros al inicio
    loadCatalog();

    function loadCatalog() {
        fetch(`${apiUrl}`)
            .then(response => response.json())
            .then(data => {
                librosTableBody.innerHTML = '';
                data.forEach(libro => {
                    addLibroToTable(libro);
                });
            });
    }

    function addLibroToTable(libro) {
        const row = librosTableBody.insertRow();
        row.insertCell(0).textContent = libro.id;
        row.insertCell(1).textContent = libro.nombre;
        row.insertCell(2).textContent = libro.autor;
        row.insertCell(3).textContent = libro.categoria;
        row.insertCell(4).textContent = libro.ano_publicacion;
        row.insertCell(5).textContent = libro.isbn;
    }

    // Manejar la búsqueda de un libro
    buscarForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('buscarId').value.trim();
        fetch(`${apiUrl}/getOne/${id}`)
            .then(response => response.json())
            .then(data => {
                const resultado = document.getElementById('resultadoBusqueda');
                if (data.error) {
                    resultado.innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
                } else {
                    resultado.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${data.nombre}</h5>
                                <p class="card-text">Autor: ${data.autor}</p>
                                <p class="card-text">Categoría: ${data.categoria}</p>
                                <p class="card-text">Año de Publicación: ${data.ano_publicacion}</p>
                                <p class="card-text">ISBN: ${data.isbn}</p>
                            </div>
                        </div>
                    `;
                }
            });
    });

    // Manejar la adición de un libro
    agregarForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const libroData = getFormData(agregarForm);
        fetch(`${apiUrl}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libroData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || data.error);
            agregarForm.reset();
            if (data.mensaje) {
                loadCatalog();
            }
        });
    });

    // Manejar la actualización de un libro
    actualizarForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('actualizarId').value.trim();
        const libroData = getFormData(actualizarForm);
        fetch(`${apiUrl}/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libroData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || data.error);
            actualizarForm.reset();
            if (data.mensaje) {
                loadCatalog();
            }
        });
    });

    // Manejar la eliminación de un libro
    borrarForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const isbn = document.getElementById('borrarIsbn').value.trim();
        if (confirm('¿Estás seguro de eliminar este libro?')) {
            fetch(`${apiUrl}/delete/${isbn}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || data.error);
                borrarForm.reset();
                if (data.mensaje) {
                    loadCatalog();
                }
            });
        }
    });

    // Función para obtener datos del formulario
    function getFormData(form) {
        const formData = new FormData(form);
        return Object.fromEntries(formData.entries());
    }
});
