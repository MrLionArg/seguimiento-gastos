Seguimiento de Gastos Personales

Proyecto final de Angular

Federico Gabriel Dion
Bootcamp Upgrade2025
Asignatura: Angular
Profesor: David Verduin Cortés

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

¿Qué es este proyecto?

Este proyecto es una aplicación web creada con Angular 19 para que cualquier persona pueda:
	•	Añadir, editar y eliminar sus gastos diarios.
	•	Filtrar y ordenar esa lista de gastos por descripción, categoría, fecha e importe.
	•	Ver estadísticas básicas (total gastado, gasto más reciente, promedio diario).
	•	Visualizar gráficos interactivos: un pastel de categorías y una línea de evolución mensual.
	•	Iniciar sesión con un usuario y contraseña sencillos, para que solo quien tenga credenciales vea los datos.

Es una herramienta intuitiva y pensada para aprender las buenas prácticas de Angular.

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Estructura planteada

seguimiento-gastos/
├── db.json               # Base de datos simulada (json-server)
├── package.json          # Dependencias y scripts de proyecto
├── angular.json          # Configuración de Angular CLI
├── src/
│   ├── main.ts           # Bootstrap de Charts y Router
│   ├── styles.css        # Estilos globales y responsive
│   └── app/
│       ├── core/         # Servicios y guards
│       │   ├── services/
│       │   │   └── gastos.service.ts
│       │   │   └── auth.service.ts
│       │   └── guards/
│       │       └── auth.guard.ts
│       ├── components/   # Componentes principales (standalone)
│       │   ├── gasto-form/
│       │   ├── gastos-list/
│       │   ├── estadisticas/
│       │   ├── graficos/
│       │   ├── login/
│       │   └── not-found/
│       ├── pages/
│       │   └── home/
│       ├── app.routes.ts # Definición de rutas
│       └── app.component.ts/html # Root con <router-outlet>
└── README.md            # Descripción y guías

Cada carpeta agrupa un área de responsabilidad: backend simulado, servicios, guardias, componentes y la página principal.

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Idea detrás

Como desarrollador junior, buscaba:
	1.	Entender el flujo completo: de la UI al servicio, del servicio al “backend” y vuelta.
	2.	Practicar formularios reactivos para crear y editar datos.
	3.	Aprender guards y navegación con rutas.
	4.	Trabajar con gráficos reales usando Chart.js.
	5.	Diseñar un estilo global sin cargar código innecesario en cada componente.

Highlight: La meta era unificar esas piezas en una app pequeña pero completa.

Funcionamiento y funcionalidades creadas
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

Estructura de componentes
	•	GastoFormComponent: formulario reactivo para crear y editar.
	•	GastosListComponent: lista, filtros y orden de resultados.
	•	EstadisticasComponent: cálculos numéricos básicos.
	•	GraficosComponent: gráficos con ng2-charts.
	•	LoginComponent: formulario de autenticación.
	•	NotFoundComponent: fallback de rutas no encontradas.
	•	HomeComponent: coordina form, stats, charts y lista de gastos.

Todos son standalone para simplificar el módulo principal.

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Cómo descargar y ejecutar
	1.	Clonar el repositorio:

git clone https://github.com/MrLionArg/seguimiento-gastos.git
cd seguimiento-gastos


	2.	Instalar dependencias:

npm install


	3.	Iniciar json-server (mock-backend):

npx json-server --watch db.json --port 3000

Esto crea http://localhost:3000/gastos.

	4.	En otra terminal, arrancar la app Angular:

ng serve -o

Se abrirá http://localhost:4200.

	5.	Login con admin/password.
	6.	Añadir, editar, filtrar y explorar gastos.

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Por qué estas tecnologías y estructura

Aunque gran parte salió del curso, también usé:
	•	json-server: para simular el backend sin Node real.
	•	Chart.js + ng2-charts: me pareció más fácil de integrar para visualizar datos.
	•	Standalone Components: simplifica los imports y evita declarar módulos innecesariamente.
	•	BehaviorSubject + RxJS: entendí por videos y tutoriales, que mejora la fluidez de datos en todo el proyecto.
	•	CSS Grid + Flexbox: sin frameworks externos, solo CSS puro, old shool o hardcodeado XD.
	•	AuthGuard: añade un nivel de seguridad con una ruta de login.

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Argumentario y experiencias

Mi experiencia y dificultades
	•	No entendía al principio cómo actualizar la vista cuando cambiaban los datos.
	•	Comparar fechas para identificar el último gasto fue un reto.
	•	Los errores de TypeScript y Angular me confundían sobre la causa real.
	•	Ajustar gráficos en móvil me llevó varios intentos con media queries.

Lo que tuve que pedir ayuda
	•	Configurar json-server para el archivo correcto.
	•	Corregir la ruta de importación en AuthGuard
	•	Añadir CommonModule y ReactiveFormsModule en LoginComponent.
	•	Acceder a controles de formulario con loginForm.get(...)
	•	Ajustar CSS para que los gráficos no desbordaran.

Lo que hice guiándome en el curso
	•	Formularios reactivos con validaciones básicas.
	•	Servicio de gastos con HttpClient y BehaviorSubject
	•	CRUD completo: GET, POST, PUT y DELETE
	•	Estadísticas con "filter" y "reduce".
	•	Gráficos con "canvas baseChart" en parte.
	•	Rutas protegidas con authGuard

¡Gracias por leer! Cualquier duda o mejora, ¡bienvenida!

Saludos,
Federico Gabriel Dion