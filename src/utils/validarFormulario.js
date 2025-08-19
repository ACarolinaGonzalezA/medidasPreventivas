export function validarFormulario(form) {
    const errores = {};
  
    if (!form.nombre_completo || form.nombre_completo.trim().length < 3) {
      errores.nombre_completo = "Debe tener al menos 3 caracteres.";
    } else if (form.nombre_completo.length > 100) {
      errores.nombre_completo = "Máximo 100 caracteres.";
    }
  
    if (!form.familia) {
      errores.familia = "Campo obligatorio.";
    } else if (form.familia.length > 50) {
      errores.familia = "Máximo 50 caracteres.";
    }
  
    if (!form.vereda) {
      errores.vereda = "Campo obligatorio.";
    } else if (form.vereda === "Otra" && !form.otra_vereda) {
      errores.otra_vereda = "Especifica la otra vereda o lugar de residencia.";
    } else if (form.otra_vereda && form.otra_vereda.length > 50) {
      errores.otra_vereda = "Máximo 50 caracteres.";
    }
  
    const seleccionadas = form.organizaciones ? form.organizaciones.split(", ") : [];
    if (seleccionadas.length === 0) {
      errores.organizaciones = "Selecciona al menos una organización.";
    } else if (seleccionadas.includes("Otra") && !form.otra_organizacion) {
      errores.otra_organizacion = "Escribe el nombre de la otra organización.";
    } else if (form.otra_organizacion && form.otra_organizacion.length > 100) {
      errores.otra_organizacion = "Máximo 100 caracteres.";
    }
  
    if (!form.correo_electronico || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.correo_electronico)) {
      errores.correo_electronico = "Correo electrónico inválido.";
    } else if (form.correo_electronico.length > 100) {
      errores.correo_electronico = "Máximo 100 caracteres.";
    }
  
    if (!form.numero_celular || !/^\d{10}$/.test(form.numero_celular)) {
      errores.numero_celular = "Debe tener exactamente 10 dígitos.";
    }
  
    if (!form.nombre_practica) {
      errores.nombre_practica = "Campo obligatorio.";
    }else if (form.nombre_practica.length > 50) {
      errores.nombre_practica = "Máximo 50 caracteres.";
    }

    if (!form.problema) {
        errores.problema = "Debe seleccionar un problema.";
      }
  
    if (!form.descripcion) {
      errores.descripcion = "Por favor explica la buena práctica.";
    } else if (form.descripcion.length > 350) {
    errores.descripcion = "Máximo 350 caracteres.";
  }

  if (form.redes && form.redes.length > 100) {
    errores.redes = "Máximo 100 caracteres.";
  }
  
    return errores;
  }
  