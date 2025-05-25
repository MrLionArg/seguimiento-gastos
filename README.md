Seguimiento de Gastos Personales
Proyecto final de Angular

Federico Gabriel Dion
Bootcamp Upgrade2025
Asignatura Angular
Profesor David Verduin Cortés

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::: ¿Qué es este proyecto?

Este proyecto es una aplicación web creada con Angular 19 para que cualquier persona pueda:
	•	Añadir, editar y eliminar sus gastos diarios.
	•	Filtrar y ordenar esa lista de gastos por descripción, categoría, fecha e importe.
	•	Ver estadísticas básicas (total gastado, gasto más reciente, promedio diario).
	•	Visualizar gráficos interactivos: un pastel de categorías y una línea de evolución mensual.
	•	Iniciar sesión con un usuario y contraseña sencillos, para que solo quien tenga credenciales vea los datos.

Es una herramienta intuitiva, responsive y pensada para aprender las buenas prácticas de Angular.

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::: Estructura planteada

seguimiento-gastos/
├── db.json               # Base de datos BBDD simulada (json-server)
├── package.json          # Dependencias y scripts de proyecto
├── angular.json          # Configuración de Angular CLI (console log interface)
├── src/
│   ├── main.ts           # Charts y Router para el HttpClient
│   ├── styles.css        # Estilos globales y responsive (en lo posible)
│   └── app/
│       ├── core/         # Servicios y authGuard
│       │   ├── services/
│       │   │   └── gastos.service.ts
│       │   │   └── auth.service.ts
│       │   └── guards/
│       │       └── auth.guard.ts
│       ├── components/   # Componentes standalone
│       │   ├── gasto-form/
│       │   ├── gastos-list/
│       │   ├── estadisticas/
│       │   ├── graficos/
│       │   ├── login/
│       │   └── not-found/
│       ├── pages/
│       │   └── home/     # Página principal
│       ├── app.routes.ts # Definición de rutas y guard
│       └── app.component.ts/html # Root con <router-outlet>
└── README.md            

Cada carpeta agrupa un área de responsabilidad: backend simulado, servicios, guardias, componentes y la página principal.

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::: Idea detrás

Como desarrollador junior, buscaba:
	1.	Entender el flujo completo: de la UI al servicio, del servicio al "backend" (de internet, mock-backend) y vuelta.
	2.	Practicar formulario reactivo para crear y editar datos.
	3.	Aprender guards y navegación con rutas.
	4.	Trabajar con gráficos "reales" usando Chart.js.
	5.	Diseñar un estilo global para los componentes por si fallan los estilos "seguros" de cada uno

Highlight::: La meta era unificar esas piezas en una app pequeña pero completa con base a lo que nos pidieron 

::: Funcionamiento y funcionalidades creadas
	1.	Autenticación: Pantalla de login. Solo admin/password funcionan.
	2.	CRUD de gastos:
	•	Crear: Rellenar formulario y pulsar “Añadir”.
	•	Listar: Ver gastos en una lista con botones de editar y eliminar.
	•	Editar: Cargar datos en el mismo formulario.
	•	Eliminar: Borrar del mock-backend.
	3.	Filtros y orden: Buscar por texto, filtrar por categoría, fecha e importe, y ordenar por fecha o importe.
	4.	Estadísticas: Total gastado, último gasto, promedio diario.
	5.	Gráficos: Pie chart de categorías y line chart de evolución mensual.
	6.	Responsive: Adaptable a escritorio, tablet y móvil con un solo CSS global.

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::: Estructura de componentes
	•	GastoFormComponent: formulario reactivo para crear y editar.
	•	GastosListComponent: lista, filtros y orden.
	•	EstadisticasComponent: cálculos numéricos.
	•	GraficosComponent: gráficos con ng2-charts.
	•	LoginComponent: formulario de autenticación.
	•	NotFoundComponent: fallback de rutas no encontradas.
	•	HomeComponent: coordina form, stats, charts y lista.

Highlight::: Todos son "standalone" para simplificar el módulo principal, por lo que pude leer en la documentación y en el "help" de la consola. Standalone como booleano.

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::: Cómo descargar y ejecutar
	1.	Clonar el repositorio:

git clone https://github.com/MrLionArg/seguimiento-gastos.git
cd seguimiento-gastos


	2.	Instalar dependencias:

npm install


	3.	Iniciar json-server (mock-backend como dije más arriba):

npx json-server --watch db.json --port 3000

	•	Esto crea http://localhost:3000/gastos.

	4.	En otra terminal (de la carpeta del proyecto), levantar la app Angular:

ng serve -o

	•	Se abrirá http://localhost:4200 en tu navegador.

	5.	Login con usuario (admin) y contraseña (password) en este caso es esta la única que funciona.
	6.	Anotar gastos, borrar, filtrar

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::: Por qué estas tecnologías y estructura, me preguntarás...
Lo que he aprendido del curso, más la ayuda de un amigo desarrollador y las explicaciones de videos de youtube, me han indicado que:

	•	Angular 19 con componente standalone: reduce la complejidad de los NgModules y aprovecha lo último del framework (últimos updates).
	•	ReactiveForms: validaciones declarativas y facilidad para editar datos, y esto lo vimos mucho en clase.
	•	BehaviorSubject + RxJS: flujo reactivo entre servicio y componentes; lo aprendí con internet sinceramente para poder aplicarlo.
	•	json-server: mock-backend rápido sin escribir Node, y repito... en internet le llaman "mock-backend" y realmente es una emulación de BBDD.
	•	Chart.js + ng2-charts: gráficos sencillos... "sencillos" si bien me costó muchísimo, y no son responsive porque cada vez que intenté, rompí todo.
	•	CSS Grid + Flexbox: diseño con estilos base sin frameworks externos y sin importaciones de librerías para esto.
	•	AuthGuard: pequeña aplicación de este tema que vimos en clase, realmente importante, y con un user base, para que tenga cierta layer de seguridad el proyect.


:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

¡Gracias por leer! Cualquier duda o mejora, totalmente bienvenida (Sé que son muchas...)
