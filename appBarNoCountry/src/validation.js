const validation = (formState) => {
    let errors = {};
  
    // UserName
    if (!formState.userName) errors.userName = "Por favor completa este campo";
  
    // Name
    if (!formState.name) errors.name = "Por favor completa este campo";
  
    // Email
    if (!formState.email) {
      errors.email = "Por favor completa este campo";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Por favor ingresa un correo electrónico válido";
    }
  
    // Password
    if (!formState.password) {
      errors.password = "Por favor completa este campo";
    } else if (formState.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }
 
    const hasErrors = Object.keys(errors).length === 0;
  
    if (hasErrors) {
      return true; // No hay errores
    } else {
      return errors; // Devolver el objeto de errores
    }
  };
  
  export default validation;
  
  
  
  