# ¿Niña o Niño? · Invitación digital

Landing de la revelación de sexo del **17 de octubre de 2026, 5:00 PM** en **Kra 12 D # 77 A-113**.

Narrativa: Llegada → Misterio → Predicción → Confirmación → Dress Code → Regalo → Ubicación → Cuenta regresiva → Gran revelación.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/ (sitio estático: Vercel, Netlify, GitHub Pages…)
```

Stack: Vite + React + TypeScript, Tailwind CSS v4, Framer Motion, canvas-confetti.

## Confirmación por WhatsApp

No hay base de datos ni inicio de sesión. El invitado llena el formulario (nombre, si asiste, si va solo o con acompañante, y su predicción) y al presionar **Confirmar por WhatsApp** se abre WhatsApp con el mensaje ya escrito hacia el número de los anfitriones. La respuesta llega cuando el invitado presiona **Enviar**.

Configura el número en `src/config/event.ts`:

```ts
export const HOST_WHATSAPP = '573001234567' // 57 + celular, sin "+" ni espacios
```

Si queda vacío, WhatsApp le pide al invitado elegir a quién enviarlo.

## Estructura

```
src/
  config/event.ts         Datos del evento, WhatsApp, calendario y paleta del dress code
  config/reveal.ts        Resultado de la revelación y textos por niña/niño
  components/sections/    Capítulos de la invitación (rsvp/ es el formulario)
  lib/whatsapp.ts         Mensaje y enlace de WhatsApp
  lib/                    Calendar, Maps, confeti y revelación
```

### La gran revelación

- Antes del 17/10/2026 a las 5:00 PM el botón **Descubrir** solo muestra un mensaje de misterio.
- El día del evento, cambia `result` en `src/config/reveal.ts` a `'nina'` o `'nino'` y vuelve a publicar. El valor queda dentro de la página, así que no lo pongas antes.
- Para ensayar sin publicar nada: abre la página con `?ensayo=nina` o `?ensayo=nino`.

### Calendario

**Agregar a Google Calendar** abre el evento ya preparado, con las notificaciones predeterminadas de cada persona.

### Dirección

Edita `mapsQuery` en `src/config/event.ts` y añade la ciudad para que el botón **Cómo llegar** abra el lugar correcto.
