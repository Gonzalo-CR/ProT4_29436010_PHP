# Gestión de Libros - API y Frontend

Este proyecto implementa una aplicación básica para la gestión de libros utilizando CodeIgniter (PHP) para el backend y una interfaz de usuario sencilla con HTML, JavaScript y Bootstrap.

## Requisitos

- PHP >= 7.4
- CodeIgniter 4
- Servidor web (Apache, Nginx, etc.)
- Base de datos MySQL o MariaDB

## Instalación

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/Gonzalo-CR/ProT4_29436010.git 

2. **Configura la base de datos**:

    Crea una base de datos llamada biblioteca.
    Importa el esquema SQL proporcionado en database/schema.sql.
    Configura la conexión a la base de datos en application/config/database.php.

3. **Configura CodeIgniter**:

    Configura el archivo application/config/config.php según tus necesidades (base_url, index_page, etc.).

4. **Inicia el servidor**:

    Si usas XAMPP o WAMP, simplemente coloca el proyecto en el directorio htdocs y accede a él desde el navegador.
    Si usas otro servidor, asegúrate de que el servidor esté configurado para servir la aplicación.


### Uso

    Accede a la interfaz de usuario en `http://localhost/codeigniter/index.php/frontend`.
    Usa el formulario para crear, actualizar y eliminar libros.
    Los libros se muestran en una tabla que se actualiza dinámicamente.


## API Endpoints

La API ofrece varios endpoints para gestionar los libros. A continuación se detallan los endpoints disponibles:

### Obtener todos los libros

- **URL**: `/index.php/libros/getAll`
- **Método**: `GET`
- **Descripción**: Devuelve una lista de todos los libros en la base de datos.

#### Ejemplo de respuesta:

```json
[
    {
        "id": 1,
        "nombre": "Cien Años de Soledad",
        "autor": "Gabriel García Márquez",
        "categoria": "Novela",
        "ano_publicacion": "1967-05-30",
        "isbn": "9780307474728"
    },
    {
        "id": 2,
        "nombre": "El Quijote",
        "autor": "Miguel de Cervantes",
        "categoria": "Novela",
        "ano_publicacion": "1605-01-16",
        "isbn": "9788491053215"
    }
]
``` 

### Obtener un libro por ID

- **URL**:  `/index.php/libros/getOne/{id}`
- **Método**: `GET`
- **Parámetros**: 
    - `id` (int): ID del libro.
- **Descripción**: Devuelve los detalles de un libro específico.

#### Ejemplo de respuesta:

```json
[
    {
        "id": 1,
        "nombre": "Cien Años de Soledad",
        "autor": "Gabriel García Márquez",
        "categoria": "Novela",
        "ano_publicacion": "1967-05-30",
        "isbn": "9780307474728"
    }
]
``` 
**** 

Crear un nuevo libro

    URL: /index.php/libros/create
    Método: POST
    Cuerpo de la solicitud:
        Debe ser un JSON con los siguientes campos:
            nombre (string): Nombre del libro.
            autor (string): Autor del libro.
            categoria (string): Categoría del libro.
            ano_publicacion (date): Año de publicación (formato YYYY-MM-DD).
            isbn (string): ISBN del libro (13 caracteres).

Ejemplo de solicitud:

json

{
    "nombre": "1984",
    "autor": "George Orwell",
    "categoria": "Ciencia ficción",
    "ano_publicacion": "1949-06-08",
    "isbn": "9780451524935"
}

Ejemplo de respuesta:

json

{
    "mensaje": "Libro creado exitosamente"
}

Actualizar un libro

    URL: /index.php/libros/update/{id}
    Método: POST
    Parámetros:
        id (int): ID del libro a actualizar.
    Cuerpo de la solicitud:
        Debe ser un JSON con los campos a actualizar:
            nombre (string): Nombre del libro.
            autor (string): Autor del libro.
            categoria (string): Categoría del libro.
            ano_publicacion (date): Año de publicación (formato YYYY-MM-DD).
            isbn (string): ISBN del libro (13 caracteres).

Ejemplo de solicitud:

json

{
    "nombre": "1984",
    "autor": "George Orwell",
    "categoria": "Distopía",
    "ano_publicacion": "1949-06-08",
    "isbn": "9780451524935"
}

Ejemplo de respuesta:

json

{
    "mensaje": "Libro actualizado exitosamente"
}

Eliminar un libro

    URL: /index.php/libros/delete/{isbn}
    Método: DELETE
    Parámetros:
        isbn (string): ISBN del libro a eliminar.
    Descripción: Elimina un libro de la base de datos.

Ejemplo de respuesta:

json

{
    "mensaje": "Libro eliminado exitosamente"
}

Validaciones y Manejo de Excepciones

La API maneja varios casos de validación y excepciones para asegurar que las solicitudes sean procesadas correctamente:

    Validación de datos: Antes de crear o actualizar un libro, la API valida que todos los campos requeridos estén presentes y sean válidos.
    Errores de entrada: Si falta algún campo requerido o si los datos son inválidos, la API devolverá un mensaje de error en formato JSON.
    Libros no encontrados: Si se intenta obtener, actualizar o eliminar un libro que no existe, la API devolverá un mensaje de error indicando que el libro no fue encontrado.

Uso del Frontend

La aplicación incluye un frontend sencillo para gestionar los libros:

    Formulario: Permite agregar o actualizar libros.
    Tabla: Muestra la lista de libros con opciones para editar o eliminar cada libro.

Requisitos del Frontend

    Navegador web moderno: El frontend está desarrollado con HTML, JavaScript y Bootstrap.

Estilización

El frontend utiliza Bootstrap para una mejor experiencia de usuario:

    Formulario: Estilizado con clases de Bootstrap para mejorar la disposición y validación de campos.
    Tabla: Utiliza clases de Bootstrap como table y table-striped para una presentación limpia y ordenada.

Instalación del Proyecto

    Clonar el repositorio:

    bash

git clone https://github.com/tu-usuario/gestion-libros.git
cd gestion-libros

Configurar la base de datos:

    Crea una base de datos llamada biblioteca.
    Ejecuta el script SQL proporcionado en database/schema.sql para crear la tabla libros.

Configurar CodeIgniter:

    Edita el archivo application/config/database.php para conectar con tu base de datos.
    Edita el archivo application/config/config.php para configurar tu base_url y otros ajustes necesarios.

Ejecutar el servidor:

    Si usas XAMPP o WAMP, coloca el proyecto en la carpeta htdocs y accede a http://localhost/gestion-libros.

    Alternativamente, usa PHP built-in server:

    bash

        php -S localhost:8000

    Acceder a la aplicación:
        Frontend: http://localhost/gestion-libros/index.php/frontend.
        API: Usa herramientas como Postman para interactuar con los endpoints.

Insertar un Lote de Datos de Prueba

Para cargar datos de prueba en la base de datos, ejecuta el siguiente script SQL:

sql

INSERT INTO libros (nombre, autor, categoria, ano_publicacion, isbn) VALUES
('Cien Años de Soledad', 'Gabriel García Márquez', 'Novela', '1967-05-30', '9780307474728'),
('El Quijote', 'Miguel de Cervantes', 'Novela', '1605-01-16', '9788491053215'),
('1984', 'George Orwell', 'Ciencia ficción', '1949-06-08', '9780451524935'),
('Fahrenheit 451', 'Ray Bradbury', 'Ciencia ficción', '1953-10-19', '9781451673319');

Contribuciones

Las contribuciones son bienvenidas. Puedes abrir un issue o enviar un pull request con tus mejoras.
Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más detalles.

markdown


### Verificación de Requisitos y Conclusión

Vamos a revisar si todos los requisitos originales y adicionales se han cumplido:

1. **CRUD completo**: Sí, implementado en el controlador `Libros.php` con manejo de excepciones.
2. **Frontend para interactuar con la API**: Sí, creado con validaciones en JavaScript y estilización usando Bootstrap.
3. **Manejo de excepciones y validaciones**: Sí, integrado en el controlador para todas las operaciones.
4. **Documentación completa**: Sí, proporcionada en el archivo `README.md` con instrucciones detalladas.
5. **Carga de datos de prueba**: Sí, proporcionado un script SQL en la documentación para insertar datos de prueba.

Todo está configurado y documentado según los requisitos proporcionados. Ahora puedes proceder a usar y expandir este proyecto según tus necesidades.

You said:
Sigue?