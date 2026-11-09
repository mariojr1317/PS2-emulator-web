# PS2 Evolution

Interfaz web experimental para un proyecto de emulación de PlayStation 2.

## Estado actual

Esta primera entrega crea la interfaz, la selección local de archivos y la estructura visual. **Todavía no emula juegos**: falta integrar un núcleo PS2 compilado a WebAssembly y validar su funcionamiento en navegadores.

## Tecnologías

- HTML, CSS y JavaScript sin dependencias para la interfaz.
- Objetivo de integración: un motor de código abierto como Play! o un port web de PCSX2.
- Los archivos seleccionados por el navegador no se envían a un servidor.

## Desarrollo por fases

1. Interfaz y biblioteca local.
2. Investigar e integrar un núcleo WebAssembly con licencia compatible.
3. Añadir controles de teclado y gamepad.
4. Añadir memoria virtual y guardados.
5. Pruebas de compatibilidad y rendimiento.

## Importante

No se distribuyen BIOS, juegos ni archivos protegidos. El usuario debe aportar archivos que tenga derecho a utilizar. La selección de un archivo en la interfaz no significa que el juego ya sea compatible.

Proyecto independiente, no afiliado ni respaldado por Sony.