export function validarFormulario(form) {
    const errores = {};
  
    if (!form.nombre_completo || form.nombre_completo.trim().length < 3) {
      errores.nombre_completo = "Debe tener al menos 3 caracteres.";
    }
  
    if (!form.familia) {
      errores.familia = "Campo obligatorio.";
    }
  
    if (!form.vereda) {
      errores.vereda = "Campo obligatorio.";
    } else if (form.vereda === "Otra" && !form.otra_vereda) {
      errores.otra_vereda = "Especifica la otra vereda.";
    }
  
    const seleccionadas = form.organizaciones ? form.organizaciones.split(", ") : [];
    if (seleccionadas.length === 0) {
      errores.organizaciones = "Selecciona al menos una organización.";
    } else if (seleccionadas.includes("Otra") && !form.otra_organizacion) {
      errores.otra_organizacion = "Escribe el nombre de la otra organización.";
    }
  
    if (!form.correo_electronico || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.correo_electronico)) {
      errores.correo_electronico = "Correo electrónico inválido.";
    }
  
    if (!form.numero_celular || !/^\d{10}$/.test(form.numero_celular)) {
      errores.numero_celular = "Debe tener exactamente 10 dígitos.";
    }
  
    if (!form.nombre_practica) {
      errores.nombre_practica = "Campo obligatorio.";
    }
    if (!form.problema) {
        errores.problema = "Debe seleccionar un problema.";
      }
  
    if (!form.descripcion) {
      errores.descripcion = "Por favor explica la buena práctica.";
    }
  
    return errores;
  }
  