# Dashboard de Usuario Regular - Recomputech

## Nuevas Funcionalidades con Gráficas

### Overview Component Mejorado

El componente de overview ha sido completamente rediseñado para incluir gráficas modernas y estadísticas detalladas del usuario.

#### Características Principales:

1. **Tarjetas de Estadísticas con Gráficas Mini**
   - Tiempo en el Perfil (días desde registro)
   - Compras Realizadas (total de compras)
   - Productos Vendidos (total de ventas)
   - Técnicos Contactados (servicios solicitados)
   - Dinero Gastado (total invertido)
   - Dinero Ganado (total ganado)

2. **Gráficas Interactivas**
   - **Gráficas de Línea Mini**: Cada tarjeta de estadística incluye una gráfica de línea que muestra la tendencia temporal
   - **Gráfica de Actividad Mensual**: Gráfica de barras que compara compras vs ventas por mes
   - **Gráfica de Distribución de Gastos**: Gráfica de dona que muestra en qué categorías gasta el usuario

3. **Diseño Responsivo**
   - Adaptado para dispositivos móviles y tablets
   - Gráficas que se ajustan automáticamente al tamaño de pantalla
   - Layout flexible que reorganiza las tarjetas según el dispositivo

#### Tecnologías Utilizadas:

- **Chart.js**: Para la creación de gráficas interactivas
- **Bootstrap 5**: Para el layout responsivo
- **Font Awesome**: Para iconos
- **AOS (Animate On Scroll)**: Para animaciones

#### Estructura de Datos:

El componente genera datos simulados basados en el ID del usuario:

```javascript
this.stats = {
    timeInProfile: 0,        // Días desde registro
    totalPurchases: 0,       // Total de compras
    totalSales: 0,          // Total de ventas
    techniciansContacted: 0, // Técnicos contactados
    totalSpent: 0,          // Dinero gastado
    totalEarned: 0,         // Dinero ganado
    activeListings: 0,      // Listings activos
    reviewsGiven: 0         // Reviews dadas
};
```

#### Archivos Modificados:

1. **`overview-component.js`**: Componente principal con todas las gráficas
2. **`dashboard.css`**: Estilos para las nuevas tarjetas y gráficas
3. **`dashboard.html`**: Inclusión de Chart.js
4. **`dashboard-content-component.js`**: Actualizado para usar el nuevo overview

#### Cómo Usar:

1. Accede al dashboard como usuario regular
2. La página de overview mostrará automáticamente las nuevas gráficas
3. Las estadísticas se generan dinámicamente basadas en el usuario actual
4. Las gráficas son interactivas y responsivas

#### Personalización:

Para personalizar las gráficas, modifica los métodos en `overview-component.js`:

- `createMiniCharts()`: Para las gráficas mini de las tarjetas
- `createMonthlyActivityChart()`: Para la gráfica de actividad mensual
- `createExpensesChart()`: Para la gráfica de distribución de gastos

#### Colores Utilizados:

- **Primario**: #218DA6 (azul teal)
- **Verde**: #28a745 (compras)
- **Amarillo**: #ffc107 (ventas)
- **Rojo**: #dc3545 (técnicos)
- **Púrpura**: #6f42c1 (dinero gastado)
- **Verde agua**: #20c997 (dinero ganado)

#### Compatibilidad:

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Dispositivos móviles (iOS 12+, Android 8+)

#### Próximas Mejoras:

- Integración con datos reales de la base de datos
- Filtros de fecha para las gráficas
- Exportación de reportes en PDF
- Más tipos de gráficas (gauge, radar, etc.)
- Comparación con otros usuarios
- Alertas y notificaciones basadas en tendencias 