import React from 'react';
import { Alert } from 'react-bootstrap';

function Header() {
  return (
    <Alert variant="primary" className="text-center">
      <h1 className="mb-3">Simulación de Ascensores POO</h1>
      <div>Maestría en Tecnologías de la Información – UNEG</div>
      <div>Asignatura: Tecnologias Orientadas a Objetos</div>
      <div>Integrantes: Miguel Mota, Jose Escalante, Julio Canelon</div>
      <div>Profesor: Ing. MSc. Carlos Abaffy</div>
    </Alert>
  );
}

export default Header;
