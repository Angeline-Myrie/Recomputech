# GitHub Pages Setup - Recomputech

## 🚀 Configuración para GitHub Pages

### 1. Estructura del Repositorio
```
Recomputech/
├── index.html (página principal)
├── assets/
│   ├── images/
│   ├── logos/
│   └── ...
├── pages/
│   ├── Aboutus.html
│   ├── marketplace.html
│   ├── services.html
│   └── ...
├── js/
│   ├── path-fixer.js (nuevo - maneja rutas automáticamente)
│   └── ...
└── components/
    └── ...
```

### 2. Configuración de GitHub Pages

1. **Ir a Settings del repositorio**
2. **Scroll hasta "Pages" en el sidebar**
3. **En "Source" seleccionar:**
   - Source: `Deploy from a branch`
   - Branch: `main` (o `master`)
   - Folder: `/ (root)`
4. **Click "Save"**

### 3. URLs Esperadas

- **Página Principal:** `https://tu-usuario.github.io/Recomputech/`
- **About Us:** `https://tu-usuario.github.io/Recomputech/pages/Aboutus.html`
- **Marketplace:** `https://tu-usuario.github.io/Recomputech/pages/marketplace.html`
- **Services:** `https://tu-usuario.github.io/Recomputech/pages/services.html`

### 4. Archivos Modificados para GitHub Pages

#### ✅ **path-fixer.js** (NUEVO)
- Detecta automáticamente si estás en GitHub Pages o Live Server
- Ajusta las rutas automáticamente
- Funciona con imágenes, scripts y enlaces

#### ✅ **components/header-component.js**
- Logo corregido para GitHub Pages: `/Recomputech/assets/logos/logo-.png`

#### ✅ **Todas las páginas principales**
- Agregado `path-fixer.js` para corrección automática de rutas

### 5. Verificación

Después del deploy, verifica que:

1. **Logo aparece** en todas las páginas
2. **Imágenes cargan** correctamente
3. **Navegación funciona** entre páginas
4. **Scripts cargan** sin errores en la consola

### 6. Troubleshooting

#### ❌ **Logo no aparece**
- Verificar que `assets/logos/logo-.png` existe
- Revisar consola del navegador para errores 404

#### ❌ **Imágenes no cargan**
- Verificar que las imágenes están en `assets/images/`
- Revisar nombres de archivos (case-sensitive)

#### ❌ **Páginas dan 404**
- Verificar que los archivos HTML están en las carpetas correctas
- Revisar que los enlaces usan rutas relativas correctas

### 7. Comandos Útiles

```bash
# Verificar estructura de archivos
ls -la

# Verificar que todos los archivos están en el repositorio
git status

# Hacer commit de todos los cambios
git add .
git commit -m "Fix paths for GitHub Pages"
git push origin main
```

### 8. Testing

1. **Local (Live Server):** `http://localhost:5500`
2. **GitHub Pages:** `https://tu-usuario.github.io/Recomputech/`

Ambos deberían funcionar correctamente con las mismas rutas.

---

## 🎯 Resultado Esperado

✅ **Live Server:** Funciona como antes
✅ **GitHub Pages:** Todas las rutas corregidas automáticamente
✅ **Imágenes:** Cargadas correctamente
✅ **Navegación:** Funcional en ambos entornos
✅ **Scripts:** Sin errores de rutas 