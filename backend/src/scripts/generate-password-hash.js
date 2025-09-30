const bcrypt = require('bcryptjs');

// Generar hash para la contraseña 123456789
const password = '123456789';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generando hash:', err);
    return;
  }
  
  console.log('Contraseña:', password);
  console.log('Hash generado:', hash);
  
  // Verificar que el hash funciona
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      console.error('Error verificando hash:', err);
      return;
    }
    console.log('Verificación exitosa:', result);
  });
});
