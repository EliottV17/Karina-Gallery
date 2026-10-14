# Karina Gallery — Plan del proyecto

Portfolio fotográfico para una familiar, inspirado en https://yansukim.com/ sin reproducir su diseño.
Stack acordado: Next.js, TypeScript, CSS Modules y GSAP/ScrollTrigger. Lenis solo si resulta necesario.
Estado: etapas 1 y 2 cerradas por confirmación del usuario. Etapa 3 implementada con Next.js 16.4.1, Bun, App Router, TypeScript estricto y rutas servidor `/` y `/info`; comprobaciones locales, verificación independiente y revisión visual aprobadas; revisión RDD aprobada con acuse nativo completado. Confirmados Manrope, filtros inferiores integrados (A), Info móvil apilado y recorrido B para Gallery. Catálogo manual y grupos provisionales autorizados; biografía inicial aprobada. Ubicaciones reales y retrato pendientes, sin bloquear el diseño. Los bocetos siguen siendo la referencia de composición; Cloudinary, galería fotográfica, recorrido GSAP, filtros y visor todavía no están implementados.

## Dirección visual y alcance propuesto

Una experiencia editorial cálida: fotografías protagonistas, navegación discreta, espacio para respirar y movimiento que acompaña sin competir.

La referencia pudo consultarse como HTML, pero no recorrerse en un navegador renderizado. Se identificaron navegación Photo/Movie/Info, filtros por categoría, páginas de trabajos y una galería con canvas. Sus animaciones no se verificaron visualmente.

Para Karina Gallery se propone una galería basada en imágenes reales en el DOM y CSS, no en canvas, por accesibilidad, carga responsive y mantenimiento. GSAP/ScrollTrigger no sustituyen un motor de galería en canvas.

Primera versión propuesta: Gallery, filtros, visor ampliado e Info. Sin videos, tienda, cuentas, panel administrativo ni base de datos. Las páginas por serie se evaluarán solo si el contenido las justifica. Este alcance inicial fue confirmado durante la etapa 1.

## Paleta Kanagawa Lotus

Usar una selección pequeña de la paleta aportada, sin alterar el color de las fotografías:

| Función propuesta | Color |
| --- | --- |
| Fondo principal | `#f2ecbc` |
| Texto habitual | `#545464` |
| Títulos y contraste fuerte | `#1f1f28` |
| Acento vegetal puntual | `#6f894e` |
| Enlaces o foco visible | `#4d699b` |
| Detalles secundarios y separadores | `#8a8980` |

El fondo tiene una presencia amarilla perceptible. La revisión de las 25 fotos respalda conservar Lotus: piedra, vegetación y luz cálida conviven con agua azul y nieve, que aportan contraste cálido/frío. Falta validar la convivencia en un layout real antes de cerrar el diseño. No teñir fotografías ni aplicar filtros para forzar su armonía. Verificar el contraste de cada color según su uso; los secundarios no se consideran automáticamente aptos para texto pequeño.

## Etapa 1 — Definir contenido y alcance

Estado: cerrada para el contenido inicial. Identidad, fotos, idioma, filtros, mantenimiento y biografía inicial aprobados. Retrato opcional y procedencias reales pendientes, sin bloquear el diseño ni la agrupación provisional autorizada.

- Confirmar nombre público de la autora y título del portfolio.
- Elegir idioma inicial.
- Reunir una muestra de 12–20 fotos representativas, incluyendo horizontales y verticales, desde Cloudinary.
- Definir categorías reales por tema, lugar o serie según el archivo.
- Reunir biografía, retrato opcional y enlaces de contacto autorizados para publicar.
- Acordar cómo se incorporarán nuevas fotos después.
- Confirmar el alcance propuesto de la primera versión.

Un catálogo tipado dentro del proyecto puede ser suficiente; Cloudinary aloja los archivos. No solicitar secretos para mostrar imágenes públicas.

Resultado: mapa de contenido y alcance acordado.

### Contenido recibido y decisiones pendientes

| Dato | Estado |
| --- | --- |
| Nombre público de la autora | Karina Lauer |
| Título del portfolio | Karina Gallery |
| Idioma inicial | Español; alemán como posibilidad futura, fuera del alcance actual |
| Muestra de fotos y URLs públicas o public IDs | 25 fotos recibidas; fuentes originales listadas debajo |
| Organización y categorías | Todas / Paisajes / Arquitectura / Momentos aceptados como punto de partida; añadir agrupación curada por lugar u otros factores |
| Biografía | Versión inicial en primera persona aprobada; revisable en la sección Info |
| Retrato | Pendiente; prever espacio compacto opcional en /info, sin fotografía sustituta ni bloque vacío visible |
| Contacto y redes | Instagram: https://www.instagram.com/karinalauer_/ |
| Forma de actualizar el catálogo | Catálogo manual confirmado: subir a Cloudinary y registrar la foto en el catálogo del proyecto |
| Alcance de la primera versión | Gallery, filtros, visor e Info; catálogo manual. Opción B confirmada en escritorio y móvil; grupos provisionales reemplazables, sin ubicaciones inventadas |

Subir una foto a Cloudinary no la incorpora automáticamente a la galería. Mantener un catálogo explícito en el proyecto con public ID, dimensiones, categoría, orden y texto alternativo; además, referencias a grupos curados y su orden interno. Lugar o nombre del grupo solo con información aportada por el usuario. No incluir sincronización automática ni panel administrativo en esta versión.

### Revisión visual y organización propuesta

Las 25 vistas previas fueron revisadas y resultaron legibles. Hay 14 fotos verticales y 11 horizontales. Los filtros temáticos fueron aceptados como punto de partida; la asignación individual sigue siendo ajustable con la autora y no identifica lugares.

| Filtro propuesto | Cantidad | Fotos según numeración de las fuentes |
| --- | --- | --- |
| Todas | 25 | 01–25 |
| Paisajes | 15 | 01, 02, 06, 07, 09, 10, 16, 17, 18, 19, 20, 21, 22, 23, 25 |
| Arquitectura | 7 | 03, 05, 08, 11, 13, 14, 24 |
| Momentos | 3 | 04, 12, 15 |

- Paisajes agrupa lagos, montañas, vegetación y escenas exteriores donde el entorno predomina.
- Arquitectura agrupa plazas, edificios, puentes, infraestructura y formas estructurales.
- Momentos reúne comida, jardines y escenas de descanso; evita crear filtros de una sola foto.
- Asignar inicialmente una categoría principal por foto; revisar los casos mixtos con la autora. No deducir categorías de los nombres de archivo.

Dirección confirmada: galería editorial que se recorre de izquierda a derecha mediante gesto vertical (opción B), tanto en escritorio como en móvil. Solo se desplaza horizontalmente la pista de fotografías; encabezado, navegación y filtros permanecen quietos durante el recorrido. Combinar individuales y pilas alineadas en dos filas. Todas las fotos tienen la misma altura por viewport y ancho según su proporción original, sin recorte. Las capas asoman hacia la derecha, sin desnivel vertical; las más anchas quedan detrás. No abrir con una imagen gigante: priorizar una vista inicial general de varios elementos. La referencia a tres columnas es orientativa, no un requisito rígido para todas las pantallas.

### Galería horizontal y grupos — estrategia acordada

- Sección de galería fijada con ScrollTrigger: el desplazamiento vertical alimenta el avance horizontal de la pista mediante `pin` y `scrub`. El documento o contenedor dedicado aporta la distancia de scroll; el escenario visible permanece fijo mientras se recorre la galería.
- Animar únicamente la pista de fotos, no el encabezado, la navegación ni la barra de filtros. Al avanzar, aparecen grupos situados a la derecha; la pista se desplaza hacia la izquierda.
- No usar `horizontal: true` como sustituto de esta estrategia: el scroll que gobierna la animación es vertical, aunque el movimiento visual sea horizontal.
- Mantener el mismo recorrido en móvil: el gesto vertical también produce avance horizontal. Ajustar escala, separación y superposición al ancho disponible, sin transformar el catálogo en una lista vertical. Usar dimensiones estables y recalcular ante cambios de orientación o viewport.
- Prever controles visibles y navegación de teclado que permitan acceder a las fotos sin depender exclusivamente de rueda, gesto o hover. Evitar bloquear zoom o capturar indiscriminadamente eventos globales.
- Info es una vista separada y puede tener su propio scroll vertical normal; la regla del escenario quieto corresponde al recorrido de Gallery. Abrir el visor debe pausar el avance de fondo y devolverlo a su posición al cerrar.
- GSAP puede acompañar entradas, cambios de filtro y apertura de grupos. Al filtrar, recalcular la longitud de la pista y la distancia de scroll, sin dejar posiciones inválidas.
- Lenis no es necesario para `pin`/`scrub`; mantenerlo diferido hasta comprobar una necesidad concreta.
- Ajustar densidad para mostrar varios elementos al inicio: no garantizar tres columnas completas en móvil ni usar una foto a pantalla completa como foco.
- Las pilas permiten abrir todas sus fotos y conservan orden de lectura y foco. Sin canvas como requisito.
- Respetar movimiento reducido con menos interpolación y animaciones decorativas, manteniendo acceso al catálogo horizontal. La experiencia final requiere verificación funcional en móvil y escritorio.
- No inferir ubicaciones. Munich, Alemania es un ejemplo, no una procedencia confirmada. Las agrupaciones iniciales son provisionales, no series geográficas.

Solicitud que motiva el cambio, conservada literalmente:

> lo veo correcto, catalogo manual ya que pienso tener algunas imagenes sobre otras como agrupadas dependiendo de algunos factores como lugar en donde se tomo la foto (ejemplo 3 imagenes una sobre otra en forma de escalera debido a que las 3 se tomaron en digamos Munich, Alemania), otra cosa en medida de lo posible quisiera que el scroll sea horizontal de izquierda a derecha desde la perspectiva del usuario me gusta esa estetica debido a que puedes echar un vistazo de todo gran parte al inicio, cuentame si es posible

Aclaración posterior del usuario, conservada literalmente:

> okey si me referia a B. scroll vertical que mueve las fotos horizontalmente, que solo esa seccion que contiene las fotos se haga el scroll lo demás se queda quieto. con respecto a 3. esta correcto no quiero una imagen gigante como foco sino algo general digamos un espacio de 3 columnas de fotos o parecido solo es un ejemplo, en movil lo mismo no quisiera cambiar a un scroll vertical que se quede horizontal, con eso dicho esta bien tu recomendacion. aun no te puedo dar el ejemplo concreto ya que no cuento con la informacion completa sobre las fotos ni en que lugar se tomaron, igual puedes escoger algunas al azar superpuestas y otras individuales entre que consulto la procedencia de las fotos y luego poder cambiar las agrupaciones

### Distribución provisional del recorrido

Selección provisional autorizada, sin afirmar que las fotos de un grupo proceden del mismo lugar. Seis grupos de tres fotos y siete individuales: las 25 fuentes aparecen exactamente una vez. La numeración remite a las URLs originales. No presentar nombres de lugares ficticios; identificar las agrupaciones como provisionales durante el diseño.

| Posición | Presentación | Fotos de referencia |
| --- | --- | --- |
| P01 | Pila provisional alineada | 01, 10, 22 |
| P02 | Individual | 09 |
| P03 | Pila provisional alineada | 03, 05, 11 |
| P04 | Individual | 06 |
| P05 | Pila provisional alineada | 02, 07, 16 |
| P06 | Individual | 24 |
| P07 | Pila provisional alineada | 04, 12, 15 |
| P08 | Individual | 14 |
| P09 | Pila provisional alineada | 17, 19, 23 |
| P10 | Individual | 08 |
| P11 | Pila provisional alineada | 18, 20, 21 |
| P12 | Individual | 13 |
| P13 | Individual | 25 |

Distribución revisada: fila superior P01, P02, P05, P06, P09, P10, P13; fila inferior P03, P04, P07, P08, P11, P12. Ambas mezclan pilas e individuales y compartirán el avance horizontal en la aplicación. Las fuentes de cada grupo se conservan; su profundidad visual se calcula por proporción, con la foto más ancha detrás, sin cambiar archivos. En los bocetos verificados las fotos miden 250 px de alto en escritorio y 220 px en móvil, con anchos naturales; las alturas son parámetros responsive del diseño, no obligaciones rígidas para otros viewports.

Mantener fotos y composición separadas en el catálogo: los grupos referencian identificadores estables y su orden, sin duplicar archivos o URLs. Cambiar miembros, separar fotos o agregar un lugar confirmado debe modificar datos de curaduría, no exigir reescribir el componente de galería. Cada foto conserva su categoría temática al cambiar de grupo. Filtrar por tema conserva las fotos coincidentes dentro de cada grupo y omite los grupos vacíos; no descarta un grupo completo solo por mezclar categorías.

Evidencia: vistas previas en `.pi/previews/karina-initial/01.jpg`–`25.jpg`, en el orden de las URLs. El explorador revisó las 25 y el padre contrastó la foto 09. El intento de generar una hoja de contacto rotulada terminó con código 1 por la fuente `DejaVu-Sans` ausente; esa hoja no se utiliza como evidencia. Las vistas previas no sustituyen los originales ni son el catálogo de producción.

### Fuentes fotográficas iniciales

Numeración según el orden de las URLs proporcionadas. Son fuentes de contenido, no títulos ni categorías aprobadas. No inferir lugares, fechas de captura o nombres de las URLs.

1. https://res.cloudinary.com/eliottv18/image/upload/v1718071532/467daa461a2e37fc222ab178c63bfd63.jpg
2. https://res.cloudinary.com/eliottv18/image/upload/v1718071531/9d0d8b8f06210bedea5e1665ac9161d4.jpg
3. https://res.cloudinary.com/eliottv18/image/upload/v1718071531/e8ca4f1461de500cf25ed7797d0a3aa3.jpg
4. https://res.cloudinary.com/eliottv18/image/upload/v1718071531/269e45c5af3da93178769891b1669a9d.jpg
5. https://res.cloudinary.com/eliottv18/image/upload/v1718071528/2a753f405698497fb9f4cece8e1b6560.jpg
6. https://res.cloudinary.com/eliottv18/image/upload/v1718071528/df7b32985c67a454a719500ea625dda6.jpg
7. https://res.cloudinary.com/eliottv18/image/upload/v1718071528/24a11e8e0562892f6585f130e9693de1.jpg
8. https://res.cloudinary.com/eliottv18/image/upload/v1718071527/4e38a3c318120dbe6d252fa052ae12f7.jpg
9. https://res.cloudinary.com/eliottv18/image/upload/v1718071527/f492b927407a7f8946f7cbc741965fca.jpg
10. https://res.cloudinary.com/eliottv18/image/upload/v1718071527/c8fe14d02a90fd5c44f202d888cc3b66.jpg
11. https://res.cloudinary.com/eliottv18/image/upload/v1690498292/powdycn2oj3jmepes7fq.jpg
12. https://res.cloudinary.com/eliottv18/image/upload/v1690498292/qiyygla6vzchiht20unc.jpg
13. https://res.cloudinary.com/eliottv18/image/upload/v1690498292/zhtbygtpvgwgnarlkwdc.jpg
14. https://res.cloudinary.com/eliottv18/image/upload/v1690498291/vaps22pwhtsrej1lhwlw.jpg
15. https://res.cloudinary.com/eliottv18/image/upload/v1690498291/pb1nvrdziem489sxeqme.jpg
16. https://res.cloudinary.com/eliottv18/image/upload/v1690498291/dgrhg3eg4mlljzm7mjcu.jpg
17. https://res.cloudinary.com/eliottv18/image/upload/v1690498291/mmadodscp6g7m3bvu1bi.jpg
18. https://res.cloudinary.com/eliottv18/image/upload/v1690498291/izeh5doeo1eihlqscblx.jpg
19. https://res.cloudinary.com/eliottv18/image/upload/v1690498291/tqbcwe0nk8myjtohevor.jpg
20. https://res.cloudinary.com/eliottv18/image/upload/v1690498291/ziwyyr8epwv9jtszlzvn.jpg
21. https://res.cloudinary.com/eliottv18/image/upload/v1690498291/swyw6s8ctlktzqrbivce.jpg
22. https://res.cloudinary.com/eliottv18/image/upload/v1690498291/ldgdfqavxg1so1mp7h8e.jpg
23. https://res.cloudinary.com/eliottv18/image/upload/v1690498291/jmokpfdqpsjosjesagjv.jpg
24. https://res.cloudinary.com/eliottv18/image/upload/v1690498291/g2xphsg0c7sizeisusjh.jpg
25. https://res.cloudinary.com/eliottv18/image/upload/v1690498291/mhxgaminsyudg4hknses.jpg

## Etapa 2 — Diseñar la experiencia

Estado: cerrada por confirmación del usuario al autorizar la etapa 3. Segunda propuesta visual y hover preliminar verificados en el boceto. No confundir la composición y el hover con la galería funcional, que corresponde a etapas posteriores.

### Decisiones visuales confirmadas

- Manrope como única familia tipográfica, con pesos contenidos y jerarquía por espacio y escala.
- Kanagawa Lotus permanece elegida por el usuario; no sustituirla unilateralmente.
- Encabezado horizontal ancho, con nombre, lema y navegación distribuidos en tres zonas en escritorio, separados por líneas discretas. Adaptar la distribución a móvil sin forzar tres bloques iguales.
- Lema provisional usado en el boceto: Instantes de mi vida. No es texto definitivo aprobado.
- Filtros opción A: franja inferior integrada con su propio espacio, sin flotar sobre las fotografías, también en móvil.
- Info horizontal en escritorio; biografía y redes apiladas en móvil, con retrato opcional cuando esté disponible.
- Composición revisada: dos filas, altura uniforme y ancho natural; no forzar marcos verticales ni recortar horizontales. El usuario acepta el menor peso visual de las verticales.
- Hover de pilas: las capas posteriores se abren hacia la derecha sin desplazamiento vertical ni cambio de altura. Capas más anchas detrás. Hover preliminar implementado en el boceto para ratón, con foco equivalente; evitar hover dependiente en táctil.
- Click futuro: vista ampliada de foto o grupo sin filtros y con Volver a la galería; detener el fondo y restaurar filtro, posición y foco al regresar.
- Recorrido futuro B con suavidad controlada mediante scrub, no una espera artificial por evento de rueda. Ajustar distancia y tiempo de seguimiento durante implementación; Lenis sigue diferido.

Confirmación del usuario, conservada literalmente:

> dale A + Manrope, info en móvil apilado y creo que no leí otra confirmación que necesitaras, si necesitas otra me avisas

### Revisión autorizada de la zona fotográfica

Encabezado, Manrope, Lotus, barra inferior e Info se conservan; cambia únicamente la composición de fotos y su hover preliminar. La explicación del usuario prevalece sobre la letra A de las opciones: altura uniforme y ancho natural, no tarjetas uniformes con recorte.

Aclaración del usuario, conservada literalmente:

> puede ser la A, pero me refiero a que las todas pueden tener la misma altura pero diferentes anchos, las horizontales pueden ser más anchas unas que otras eso supongo que lo decide el mismo cloudinary y como manda las fotos nosotros si le ponemos una altura predefinada a todos aparte de la como más naturalidad y no es todo rigido misma altura y mismo ancho sino varia dependiendo de la imagen que manda el cloudinary dando esa vista como de "desordenado", si hay una agrupación de horizontales creo que lo mejor sería que las más anchas esten al fondo del todo, la verticales por naturaleza si tienen una altura similar a la de las anchas puede que pierdan "peso" o visibilidad en la galeria pero es algo con lo que estoy bien, me dejo entender?

Límite y autorización de trabajo, conservados literalmente:

> dale, justo así, vas a necesitar modificar algo ? las imagenes de referencia o algo de design antes de pasar a la etapa 3 de la creación del proyecto? solo respondeme eso y aun no pases a la etapa 3 antes de que te confirme

> si necesitas modificar algo antes de pasar a la etapa 3 hazlo ahora, sino me lo dices y te doy la confirmación para la etapa 3

### Bocetos y evidencia de revisión

| Vista | Captura | Viewport exacto | Comprobación |
| --- | --- | --- | --- |
| Gallery escritorio | `design/gallery-desktop.png` | 1440 × 900 | PASS |
| Gallery móvil | `design/gallery-mobile.png` | 390 × 844 | PASS |
| Info escritorio | `design/info-desktop.png` | 1440 × 900 | PASS |
| Info móvil | `design/info-mobile.png` | 390 × 844 | PASS |

Fuentes visuales: `design/gallery.html`, `design/info.html`, `design/style.css` y `design/layout.js`. Manrope y licencia OFL se encuentran en `design/assets/`. Las fotos provienen de las 25 vistas previas reales; originales y vistas previas no se modificaron. No se usan retratos ficticios. Captura adicional: `design/gallery-desktop-hover.png` muestra la apertura de la primera pila.

Verificación v2: `node design/render.mjs` terminó con exit 0 y produjo `design/render-checks.json`. Manrope y las 25 fotos cargaron; se conservan 13 elementos y dos filas. Las alturas medidas son uniformes (250 px escritorio, 220 px móvil), los anchos varían con la proporción sin recorte, las capas comparten Y y las más anchas quedan atrás. Hover de la primera pila de escritorio: las capas posteriores avanzan 16/32 px adicionales en X y 0 px en Y, sin cambio de altura. Las medidas de filtros y pie coinciden con el boceto anterior; los PNG de Info son idénticos a los aprobados. Se revisaron visualmente Gallery escritorio/móvil y la captura de hover; no se modificó el encabezado.

Evidencia test-first: RED inicial terminó con exit 1 y 11 incumplimientos esperados de la composición anterior. El primer GREEN tuvo un fallo de hover porque headless declaraba hover/puntero fino false, aunque :hover sí se activaba. Un diagnóstico de solo lectura confirmó esa causa. Se configuraron las capacidades de ratón usadas por Playwright upstream y emulación táctil por dispositivo, manteniendo el sandbox y la puerta CSS de hover para no forzarlo en móvil. GREEN final exit 0 verificó composición, hover y conservación de Info/filtros. Comprobaciones de layout en `design/layout-check.mjs`.

Fallo conservado: el primer comando combinado de Chromium terminó con exit 1 al comparar un DOM móvil de 500 px con un límite solicitado de 390 px. Se corrigió el renderizador, no el CSS por esa alerta: CDP mide y captura el mismo viewport. Los logs iniciales y capturas previas están en `.pi/previews/`. No se desactivó el sandbox.

Límites: hay composición en dos filas y hover/foco preliminar de pilas en el boceto; no hay GSAP, filtros funcionales, visor ni ruta Next.js `/info`. Los PNG no prueban scroll táctil, tiempos de animación, rendimiento de imágenes en producción ni accesibilidad del visor. Otros tamaños y dispositivos se validarán durante implementación. Documentación de revisión en `design/README.md`.

Entorno de etapa 2: Git resolvía al repositorio padre `/home/eliott/Projects`. En etapa 3, el usuario autorizó un repositorio propio dentro de Karina-Gallery: inicializado en `main`, sin staging ni commits y sin modificar el repositorio padre ni proyectos vecinos.

### Gallery

- Proponer `/` como entrada directa a la galería, sin portada intermedia.
- Nombre de la autora y navegación Gallery / Info.
- Composición editorial en dos filas, misma altura y anchos naturales; pilas alineadas sin escalera vertical y capas más anchas detrás. El recorrido horizontal mediante scroll vertical (B) sigue confirmado para escritorio y móvil, aún no implementado.
- Distinguir filtros temáticos de grupos curados por lugar u otros factores.
- Ajustar densidad para mostrar varios grupos inicialmente sin sacrificar legibilidad de las fotografías.
- Barra de filtros, cantidad de resultados y acceso a la vista ampliada.
- Validar escala móvil conservando el recorrido horizontal y el acceso a todas las fotografías de cada grupo.

### Info — ruta prevista `/info`

- Presentación breve con nombre, biografía provisional e Instagram.
- Sección pequeña y opcional para un retrato futuro, sin convertirlo en hero ni requisito para publicar Info.
- En escritorio, prever el retrato junto al texto; en móvil, apilar retrato opcional, biografía y redes sin ocupar toda la primera pantalla con la foto.
- Mientras no exista una foto, omitir el elemento de imagen y el hueco visual: no usar retrato inventado, imagen de stock ni texto de placeholder en la versión pública.
- Mantener el retrato como contenido opcional para incorporarlo después sin reestructurar la página.
- La ruta `/info` se incorporó en etapa 3 con la biografía provisional y redes aprobadas; el retrato y contenido definitivo siguen pendientes.

#### Biografía provisional

> Soy Karina Lauer. Nací en Lima, Perú, y me gradué en Ciencias de la Comunicación. Actualmente vivo en Alemania y estoy felizmente casada.
>
> Me dedico a la fotografía de forma independiente: documento viajes y creo contenido para redes sociales, principalmente Instagram.

Versión provisional en primera persona, con tono cercano y basada exclusivamente en los datos aportados. No añadir experiencia, reconocimientos, ubicación precisa en Alemania ni formación adicional. Puede reemplazarse cuando la autora revise el texto.

Datos originales y solicitud del usuario, conservados literalmente:

> biografia (aun no muy clara y tal vez un poco corta): Nacida en Lima, Peru. Graduada de Ciencias de la Comunicación y actualmente residiendo en alemania, realiza trabajos independientes de fotografia documentando viajes y redes sociales principalmente instagram, felizmente casada. Puedes usar eso por mientras aun no tengo una foto de ella eso queda pendiente puedes guardar una seccion pequeña para una posible foto en la ruta de Info

Corrección de voz solicitada por el usuario, conservada literalmente:

> corrige la redaccion, no me gusta como esta en tercera persona me gustaria algo mas como "Karina Lauer nadica en Lima, Perú..." algo mas tu a tu como si fuera su portfolio

### Navegación y filtros

- Encabezado horizontal ancho con nombre, lema provisional y navegación.
- Franja inferior integrada (A), persistente durante Gallery y separada de las fotografías; misma ubicación inferior en móvil.
- Ocultar filtros en la futura vista ampliada y restaurarlos al volver.

Resultado: bocetos de escritorio y móvil con fotos reales y primera validación visual antes de invertir en animaciones.

## Etapa 3 — Preparar la base técnica

Estado: base implementada y verificación completada. Lint, tipos, 2 pruebas unitarias (23 assertions), build de producción y 8 pruebas de navegador aprobados de forma independiente; revisión visual de escritorio y móvil aprobada; revisión RDD aprobada y acuse nativo completado.

Solicitud del usuario, conservada literalmente:

> lee @PLAN.md ya están listas las etapas 1 y 2, ahora procederemos a hacer la etapa 3 que es iniciar el proyecto nextjs y typescript estricto y lo que dice el plan en esa etapa, el proyecto nextjs inicializalo en la versión mas actual estable e instalalo con Bun no con npm

- Next.js con App Router y TypeScript estricto.
- CSS Modules para componentes y variables CSS globales para colores, espaciado y tipografía.
- Contenido y estructura renderizados en servidor; componentes cliente solo para interacciones y animaciones.
- Lint, comprobación de tipos y base de pruebas.
- Integrar GSAP cuando se necesite. No instalar Lenis de entrada.

Resultado: estructura navegable, responsive y sin errores de compilación.

### Base técnica implementada

- Next.js y `create-next-app` 16.4.1, versión del canal estable `latest` confirmada directamente en el registro al instalar. Dependencias instaladas con Bun 1.4.3; `bun.lock` y `packageManager` registrados, sin lockfile npm.
- App Router en `src/app/`, alias `@/*`, `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` y `allowJs: false`.
- `/` es una entrada navegable de base, no el layout fotográfico final ni una portada adicional: se reemplazará su contenido por Gallery en etapas 4–5. `/info` renderiza en servidor la biografía provisional y el enlace real de Instagram. Sin retrato ficticio ni hueco vacío.
- Shell compartido con navegación, página actual y enlace para saltar al contenido; componentes servidor, CSS Modules y tokens globales Lotus. Manrope local mediante `next/font/local`, con licencia OFL en `src/assets/`.
- Comandos documentados en `README.md`: `bun run dev`, `lint`, `typecheck`, `test:unit`, `test:e2e`, `test` y `build`. Playwright ejecuta el build de producción en escritorio, tablet, móvil emulado y con JavaScript deshabilitado. Chromium mantiene el sandbox; no se verificó un móvil físico.
- GSAP y Lenis no se instalan todavía. Tampoco se adelantan catálogo, Cloudinary, grupos, filtros, visor ni scroll vertical→horizontal.
- Git propio en `main`, sin staging, commits, remoto ni publicación. Raíces de Turbopack y trazado fijadas al proyecto; archivos locales `.pi/`, `.atl/` y salidas de pruebas ignorados.

Evidencia test-first: plantilla vacía RED con 2 fallos esperados (metadatos/idioma y shell ausentes). Primer GREEN: lint, tipos, 2 unitarias y build aprobados; navegador 1 PASS/1 FAIL porque el test buscaba `Manrope`, pero `next/font/local` publica `manrope`. Corregida únicamente la detección de familia, sin sustituir la fuente. GREEN final exit 0: lint, tipos, 2 unitarias, build, 2 pruebas focales y suite completa 8/8. La configuración generada ya era estricta; su inicialización no tenía un RED significativo y se comprobó estructuralmente.

Verificación independiente completada desde una sesión nueva anclada al Git propio, resolviendo el bloqueo anterior de identidad Git sin eludir la protección del harness. Lint, tipos, unitarias, build y 8 pruebas E2E pasaron en una copia aislada. El primer build aislado falló por un symlink de `node_modules` fuera del límite de Turbopack; al corregir el aislamiento con dependencias dentro de su raíz, el build pasó sin cambiar la aplicación. Las capturas de `/` y `/info` a 1440×900 y 390×844 fueron revisadas visualmente: sin recortes ni superposiciones, con Info apilado en móvil. Se verificaron navegación, foco, enlace para saltar al contenido, HTML sin JavaScript y Manrope local. Evidencia local ignorada en `.pi/stage3-verification-evidence/`.

Revisión RDD de los archivos de etapa 3 aprobada con tres lentes (riesgo, legibilidad y fiabilidad); acuse nativo completado. La sincronización de integración autorizada actualizó también archivos globales del harness. Sin bloqueos para cerrar la base técnica. Aviso no bloqueante: falta favicon y su petición devuelve 404. Móvil físico todavía no verificado; corresponde a la etapa 8. Esta revisión no abarca los bocetos preexistentes de `design/`.

## Etapa 4 — Integrar Cloudinary

- Catálogo explícito con identificador, public ID, dimensiones, texto alternativo, categoría y orden.
- Título, lugar y fecha solo si aportan y están disponibles.
- `next/image` con loader de Cloudinary, `srcset` y `sizes` responsive.
- Transformaciones como `f_auto` y `q_auto`, validadas visualmente.
- Reservar dimensiones para evitar saltos de layout.
- Carga diferida fuera de la primera pantalla; variantes grandes al abrir el visor.
- Cloudinary como única capa de transformación, sin segunda optimización innecesaria.
- Si posteriormente se requiere la API administrativa, usarla exclusivamente del lado servidor, sin exponer secretos.

Resultado: fotos reales, nítidas y ajustadas al tamaño de pantalla.

## Etapa 5 — Construir Gallery y los filtros

Primero hacer que funcione sin animación:

- Layout adaptable a escritorio, tablet y móvil; mantener opción B en todos los tamaños, sin convertir la galería móvil en lista vertical.
- Grupos curados con referencias y orden explícito; fotos individuales cuando no corresponda agrupar.
- Superposición visual sin perder acceso a ninguna foto; controles que no dependan únicamente de hover.
- Orden visual y de lectura coherentes.
- Filtro Todas y categorías acordadas.
- Estado activo identificable sin depender solo del color.
- Tratamiento de resultados vacíos y errores de imagen.
- Conservar el filtro al abrir y cerrar una foto.
- Evaluar carga por lotes según el volumen real del catálogo.

Resultado: galería usable con mouse, teclado y pantalla táctil.

## Etapa 6 — Construir el visor y completar Info

- Vista ampliada con imagen completa, sin recorte forzado.
- Controles anterior, siguiente y cierre; teclas de dirección y Escape.
- Gestión del foco y devolución al elemento de origen.
- Restauración de la posición de scroll y controles táctiles claros.
- Completar Info con contenido definitivo.
- Evaluar páginas por serie solo si existe una narrativa que las justifique.

Resultado: recorrido completo entre galería, fotografía y autora.

## Etapa 7 — Añadir movimiento

| Interacción | Enfoque propuesto |
| --- | --- |
| Entrada inicial | Secuencia breve de texto y primeras imágenes |
| Recorrido de Gallery | ScrollTrigger `pin`/`scrub`: entrada vertical y pista de fotos horizontal, en escritorio y móvil |
| Aparición durante el recorrido | Movimiento complementario discreto, sin desplazar encabezado ni barras |
| Cambio de filtro | Transición corta; GSAP Flip si hace falta animar la redistribución |
| Apertura del visor | Transición coordinada entre miniatura y vista ampliada |
| Hover y foco | CSS cuando sea suficiente |
| Info | Revelados puntuales, no cada párrafo |

- Limpiar animaciones al navegar.
- Respetar `prefers-reduced-motion`.
- No bloquear la entrada esperando todo el catálogo.
- Evaluar Lenis únicamente si el scroll nativo no consigue la sensación buscada y la mejora compensa su complejidad.
- Sin cursor personalizado ni suavizado global adicional de entrada; el recorrido vertical→horizontal de Gallery sí forma parte del diseño confirmado.

Resultado: experiencia animada estable sin sacrificar navegación ni rendimiento.

## Etapa 8 — Verificar y pulir

La verificación acompaña cada etapa; aquí se realiza la pasada integral:

- Filtros, visor, navegación y enlaces.
- Teclado, foco, contraste y movimiento reducido.
- Móvil real, tamaños de pantalla y navegadores.
- Conexión lenta y fallos de carga.
- Tipos, lint, pruebas y build de producción.
- Rendimiento: imagen inicial, estabilidad del layout y respuesta a interacciones.
- Metadatos, Open Graph, sitemap y textos alternativos.

Resultado: candidata lista para publicar con problemas pendientes identificados explícitamente.

## Etapa 9 — Publicar y documentar mantenimiento

Solo con autorización de publicación:

- Elegir hosting y dominio.
- Revisar una versión de preproducción.
- Publicar y comprobar la versión pública.
- Documentar cómo agregar fotos, modificar categorías y actualizar Info.
- Revisar consumo y límites de Cloudinary.

Resultado: portfolio publicado y procedimiento sencillo para mantenerlo.

## Próximo paso

La verificación de etapa 3 está completada. El usuario autorizó un commit inicial de todos los archivos del proyecto para preparar su futura subida a GitHub; esta autorización no incluye push ni publicación. Con autorización posterior del usuario, avanzar a etapa 4: catálogo explícito y Cloudinary. El lema sigue provisional; retrato y procedencias pueden incorporarse después. No publicar sin autorización.
