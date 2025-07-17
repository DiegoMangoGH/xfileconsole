# Estructura del Proyecto y Estándares de Codificación

Este documento describe la estructura de archivos y los estándares generales de codificación observados en este proyecto.

## Estructura de Archivos

El proyecto sigue una arquitectura basada en componentes, organizada principalmente dentro del directorio `src/`.

-   **`src/`**: Contiene todo el código fuente.
    -   **`src/App.tsx`**: El componente principal de la aplicación, que maneja el enrutamiento y el estado global.
    -   **`src/index.css`**: CSS global, probablemente utilizando directivas de Tailwind CSS.
    -   **`src/main.tsx`**: Punto de entrada de la aplicación React.
    -   **`src/types.ts`**: Definiciones de tipos e interfaces de TypeScript para estructuras de datos (por ejemplo, `Transmission`, `ScheduledTask`, `EventShippingTask`).
    -   **`src/vite-env.d.ts`**: Declaraciones de tipos del entorno Vite.
    -   **`src/assets/`**: Activos estáticos como imágenes.
        -   `src/assets/image.png`
    -   **`src/components/`**: Componentes de interfaz de usuario reutilizables.
        -   **`src/components/auth/`**: Componentes relacionados con la autenticación.
            -   `src/components/auth/LoginForm.tsx`
        -   **`src/components/forms/`**: Componentes relacionados con formularios para la entrada de datos.
            -   `src/components/forms/AddEventShippingForm.tsx`
            -   `src/components/forms/AddScheduledTaskForm.tsx`
            -   `src/components/forms/TransmissionForm.tsx`
            -   **`src/components/forms/components/`**: Subcomponentes utilizados dentro de los formularios.
                -   `src/components/forms/components/ParametersSection.tsx`
                -   `src/components/forms/components/RecurrenceSection.tsx`
        -   **`src/components/layout/`**: Componentes de diseño (por ejemplo, navegación, estructura general).
            -   `src/components/layout/Layout.tsx`
            -   `src/components/layout/Sidebar.tsx`
        -   **`src/components/modals/`**: Componentes de diálogo modal.
            -   `src/components/modals/ConfirmationModal.tsx`
            -   `src/components/modals/EditEventShippingModal.tsx`
            -   `src/components/modals/EditScheduledTaskModal.tsx`
            -   `src/components/modals/TransmissionDetailsModal.tsx`
        -   **`src/components/tables/`**: Componentes de tabla para mostrar datos.
            -   `src/components/tables/TransmissionTable.tsx`
        -   **`src/components/ui/`**: Elementos de interfaz de usuario genéricos y altamente reutilizables (por ejemplo, botones, entradas).
            -   `src/components/ui/Button.tsx`
            -   `src/components/ui/FileInput.tsx`
            -   `src/components/ui/ProviderSelect.tsx`
            -   `src/components/ui/ProviderSummary.tsx`
            -   `src/components/ui/SearchInput.tsx`
            -   `src/components/ui/StatusBadge.tsx`
            -   `src/components/ui/Toggle.tsx`
        -   **`src/components/views/`**: Componentes de alto nivel que representan diferentes vistas/páginas de la aplicación.
            -   `src/components/views/DashboardView.tsx`
            -   `src/components/views/EventShippingView.tsx`
            -   `src/components/views/MonitorizationView.tsx`
            -   `src/components/views/ScheduledTasksView.tsx`
            -   `src/components/views/ToolsView.tsx`
            -   `src/components/views/TransmissionHistoryView.tsx`
            -   `src/components/views/TransmissionTypeView.tsx`
            -   **`src/components/views/components/`**: Subcomponentes específicos de vistas.
                -   `src/components/views/components/ConnectionStatus.tsx`
                -   `src/components/views/components/LogsSection.tsx`
                -   `src/components/views/components/QueueSection.tsx`
                -   `src/components/views/components/RecentActivity.tsx`
                -   `src/components/views/components/SystemMetrics.tsx`
                -   `src/components/views/components/ToolsSection.tsx`
    -   **`src/constants/`**: Contiene datos constantes o datos simulados.
        -   `src/constants/mockData.ts`
        -   `src/constants/providers.ts`
    -   **`src/hooks/`**: Hooks personalizados de React para lógica reutilizable.
        -   `src/hooks/index.ts` (reexporta otros hooks)
        -   `src/hooks/useConfirmation.ts`
        -   `src/hooks/useModal.ts`
    -   **`src/services/`**: (Vacío, pero típicamente para llamadas a API o integraciones de servicios externos)
    -   **`src/utils/`**: Funciones de utilidad.
        -   `src/utils/dateUtils.ts`
        -   `src/utils/filterUtils.ts`

## Estándares de Codificación

El proyecto se adhiere a las prácticas modernas de desarrollo de React con TypeScript para la seguridad de tipos y Tailwind CSS para el estilo.

### Principios Generales:
-   **Arquitectura Basada en Componentes**: La aplicación se divide en componentes pequeños y reutilizables, lo que promueve la modularidad y la mantenibilidad.
-   **Componentes Funcionales y Hooks**: Los componentes son principalmente funcionales y utilizan Hooks de React (`useState`, `useEffect`, hooks personalizados) para la gestión del estado y los efectos secundarios.
-   **TypeScript**: Se utiliza tipado fuerte en todo el código base para mejorar la calidad del código, detectar errores tempranamente y mejorar la experiencia del desarrollador. Las interfaces se definen en `src/types.ts` para estructuras de datos compartidas.
-   **Estilo con Tailwind CSS**: Se utiliza un framework CSS de utilidad primero para el estilo, aplicado directamente en JSX a través de atributos `className`. Esto promueve un desarrollo rápido de la interfaz de usuario y un diseño consistente.
-   **Enrutamiento**: Se utiliza `react-router-dom` para el enrutamiento declarativo dentro de la aplicación.
-   **Iconografía**: Se utiliza `lucide-react` para los iconos vectoriales.
-   **Animaciones**: Se utiliza `framer-motion` para animaciones y transiciones declarativas.

### Patrones Específicos:
-   **Gestión del Estado**: `useState` se utiliza para el estado a nivel de componente. Para un estado global más complejo, se podría introducir una API de contexto o una biblioteca de gestión de estado si fuera necesario (no se observa explícitamente en los archivos actuales, pero es una práctica común).
-   **Manejadores de Eventos**: Los manejadores de eventos se definen típicamente como funciones de flecha o se memorizan usando `useCallback` donde el rendimiento es crítico.
-   **Prop Drilling**: Aunque se observa cierto "prop drilling", se pueden utilizar hooks personalizados y el contexto para mitigar esto en componentes anidados profundamente.
-   **Obtención de Datos**: (No se observa explícitamente en los archivos proporcionados, pero típicamente se maneja en `useEffect` o hooks personalizados, potencialmente integrándose con una capa de `services`).
-   **Legibilidad del Código**: Énfasis en un código claro y conciso con nombres significativos para variables y funciones.
-   **Manejo de Errores**: El manejo básico de errores está presente (por ejemplo, en formularios), pero podría ampliarse para una retroalimentación más robusta al usuario y el registro.