# Evaluación QA – Despénsalo.cl

## Descripción

Este repositorio contiene una evaluación de calidad de la plataforma web [Despénsalo.cl](https://despensalo.cl/), realizada desde la perspectiva de un usuario final.

El proyecto incluye pruebas manuales, testing exploratorio y automatización con Playwright. Su objetivo fue comprobar funcionalidades principales, identificar defectos y oportunidades de mejora y presentar evidencia útil para el socio formador.

## Alcance

La evaluación consideró funcionalidades relacionadas con:

* Autenticación.
* Inventario.
* Lista de compras.
* Botiquín.
* Historial.
* Ajustes.
* Navegación responsive.
* Persistencia de sesión.

Quedaron fuera del alcance las pruebas de rendimiento, carga, estrés y seguridad, los accesos administrativos y las acciones que pudieran afectar datos de terceros o la integridad de la plataforma.

## Resultados principales

* 8 casos manuales ejecutados.
* 8 casos manuales aprobados.
* 3 sesiones de testing exploratorio.
* 2 bugs y 2 hallazgos registrados.
* 3 casos automatizados con Playwright.
* 9 ejecuciones automatizadas.
* 9 ejecuciones aprobadas.
* 0 ejecuciones fallidas.
* 0 pruebas flaky.
* 37,5 % de cobertura de automatización sobre los casos manuales.

## Automatización

Los siguientes casos fueron automatizados:

* `CP-001`: inicio de sesión con credenciales válidas.
* `CP-002`: validación ante una contraseña incorrecta.
* `CP-004`: impedir el registro de un producto sin nombre.

Cada script fue ejecutado tres veces consecutivas en Chromium, obteniendo nueve ejecuciones aprobadas.

## Estructura del repositorio

```text
Automatizacion_Despensalo/
├── docs/
├── evidencias/
├── tests/
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

### Carpeta `docs`

* **Alcance_QA_Despensalo.pdf:** define el alcance, las exclusiones, los casos y la cobertura de la evaluación.
* **Automatizacion_de_pruebas.pdf:** describe los scripts, sus acciones, aserciones y resultados.
* **Evidencias_de_pruebas_manuales.pdf:** presenta la ejecución y las capturas de los ocho casos manuales.
* **Informe_de_Evaluacion_de_Calidad.pdf:** integra resultados, métricas, patrones, recomendaciones y conclusiones.
* **Matriz_casos_prueba.xlsx:** contiene la matriz de casos, el registro de bugs y hallazgos y la matriz de defectos priorizados.
* **Presentacion_Ejecutiva_Despensalo.pdf:** resume los resultados y recomendaciones principales.
* **Testing_exploratorio.pdf:** documenta las sesiones exploratorias, los hallazgos y los nuevos casos propuestos.

### Carpeta `evidencias`

Contiene las capturas individuales de las pruebas manuales, exploratorias y automatizadas, identificadas mediante códigos de evidencia.

### Carpeta `tests`

Contiene los tres scripts desarrollados con Playwright:

```text
cp001-login-valido.spec.js
cp002-login-invalido.spec.js
cp004-producto-sin-nombre.spec.js
```

## Tecnologías utilizadas

* Playwright.
* JavaScript.
* Node.js.
* Chromium.
* Visual Studio Code.
* GitHub.

## Ejecutar las pruebas

Instalar las dependencias:

```bash
npm install
```

Instalar Chromium para Playwright:

```bash
npx playwright install chromium
```

Crear un archivo `.env` con las credenciales de prueba:

```env
DESPENSALO_EMAIL=correo_de_prueba
DESPENSALO_PASSWORD=contraseña_de_prueba
```

Ejecutar las pruebas:

```bash
npx playwright test --project=chromium --workers=1
```

Ejecutar tres repeticiones por caso:

```bash
npx playwright test --project=chromium --repeat-each=3 --workers=1
```

Abrir el reporte HTML:

```bash
npx playwright show-report
```

## Seguridad

El archivo `.env` no se incluye en el repositorio, ya que contiene las credenciales utilizadas durante las pruebas. También se excluyen `node_modules`, los resultados temporales y los reportes generados localmente.

## Conclusión

Las funcionalidades principales evaluadas presentaron un comportamiento estable dentro del alcance definido. El testing exploratorio permitió detectar riesgos relacionados con la pérdida y recuperación de información, mientras que la automatización confirmó la repetibilidad de los tres casos seleccionados.
