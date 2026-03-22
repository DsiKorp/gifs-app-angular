# Gifs App Angular

Aplicación web construida con Angular 21 para explorar GIFs desde la API de Giphy. La app permite ver tendencias, buscar por texto y revisar el historial de búsquedas persistido en `localStorage`.

## Descripción

El proyecto está organizado como una SPA con rutas lazy loaded, componentes standalone y un servicio central que consume la API de Giphy. La interfaz usa Tailwind CSS y presenta un menú lateral fijo para navegar entre las vistas principales.

## Funcionalidades

- Visualización de GIFs en tendencia.
- Búsqueda de GIFs por texto.
- Scroll infinito en las vistas de tendencias y búsqueda.
- Historial de búsquedas persistido en `localStorage`.
- Navegación por historial desde el menú lateral.
- Carga diferida de páginas mediante `loadComponent`.
- Enrutado con `HashLocationStrategy`.

## Stack técnico

- Angular 21
- TypeScript
- Angular Router
- Angular HttpClient con `withFetch()`
- Signals para manejo de estado local
- Tailwind CSS 4
- RxJS

## Estructura principal

```text
src/
	app/
		app.config.ts
		app.routes.ts
		gifs/
			components/
				gif-list/
				gifs-side-menu/
				masonry-grid/
			interfaces/
			mapper/
			pages/
				dashboard-page/
				trending-page/
				search-page/
				gif-history-page/
			services/
				gifs.service.ts
		shared/
			services/
				scroll-state.service.ts
	environments/
		environment.ts
		environment.development.ts
```

## Arquitectura

### Rutas

La aplicación define un contenedor principal en `/dashboard` y carga sus páginas hijas de forma perezosa:

- `/dashboard/trending`: muestra los GIFs en tendencia.
- `/dashboard/search`: permite buscar GIFs por término.
- `/dashboard/history/:query`: muestra el historial asociado a una búsqueda concreta.

Si la URL no coincide con ninguna ruta válida, la app redirige a `#/dashboard/trending`.

### Servicio principal

El archivo `src/app/gifs/services/gifs.service.ts` concentra la lógica de negocio:

- Obtiene GIFs trending desde `GET /gifs/trending`.
- Realiza búsquedas con `GET /gifs/search`.
- Mantiene el estado mediante Angular Signals.
- Agrupa resultados de 3 en 3 para renderizar la cuadrícula.
- Guarda el historial de búsquedas en `localStorage` bajo la clave `gifs_history`.

### Persistencia local

El historial se almacena en el navegador y se reutiliza para:

- poblar las opciones dinámicas del menú lateral,
- reconstruir resultados históricos en la ruta `/dashboard/history/:query`.

### Interfaz

- Menú lateral fijo con branding y accesos a Trending, Search e historial.
- Cuadrícula de GIFs con diseño responsivo.
- Assets estáticos servidos desde `public/`.

## Requisitos

- Node.js 20 o superior recomendado.
- npm 11 o compatible.

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm start
```

Esto levanta el servidor de desarrollo de Angular. La aplicación usa hash routing, por lo que normalmente navegarás con URLs del tipo:

```text
http://localhost:4200/#/dashboard/trending
```

## Build de producción

```bash
npm run build
```

La compilación genera la salida en:

```text
dist/gifs-app-angular
```

## Pruebas

```bash
npm test
```

El proyecto incluye configuración para pruebas unitarias, aunque actualmente el repositorio solo contiene una especificación base en `src/app/app.spec.ts`.

## Configuración de entorno

Los valores de entorno están definidos en:

- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

Actualmente incluyen:

- nombre y slogan de la aplicación,
- URL base de la API de Giphy,
- API key usada por el servicio de GIFs.

## Recursos estáticos

La carpeta `public/` contiene los recursos visuales usados por la interfaz, por ejemplo:

- `GifSearch.png`
- `IcoGifSearch.png`
- `favicon.ico`

## Decisiones de implementación observadas en el código

- Se usa `provideHttpClient(withFetch())` como implementación de `HttpClient`.
- La navegación utiliza `HashLocationStrategy`.
- Las páginas principales se cargan con `loadComponent`.
- El estado de scroll se conserva mediante `ScrollStateService`.
- El mapeo de la respuesta de Giphy hacia el modelo interno `Gif` se realiza en `GifMapper`.

## Estado actual del proyecto

Durante la revisión se verificó que el proyecto compila correctamente con:

```bash
npm run build
```

## Posibles mejoras

- Separar el estado de carga de trending y búsqueda para evitar acoplamiento entre flujos.
- Reutilizar el componente `masonry-grid` en las páginas que hoy renderizan la cuadrícula manualmente.
- Completar y actualizar las pruebas unitarias existentes.
- Eliminar carpetas duplicadas como `search-page copy` y `trending-page copy` si ya no se utilizan.

## Autoría

README generado a partir de la revisión del código actual del proyecto.
