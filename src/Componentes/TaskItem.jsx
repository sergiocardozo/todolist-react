import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { useState } from 'react'


/* 
Componente de Tarea (TaskItem):
Este componente deberá representar individualmente una tarea.
Mostrará el nombre de la tarea y un botón para completarla.
Utilizará el estado local para gestionar la apariencia de la tarea (por ejemplo, tachado
cuando esté completada).
 */


//Recibe las props 'tarea' y 'estado' desde el componente padre TaskList
export const TaskItem = ({ id, nombre, completado, actualizarTarea, eliminarTarea, editarTarea }) => {
  const [estado, setEstado] = useState(completado)
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);


  //handleSwitch setea el valor del estado a uno diferente al estado previo y envia esta informacion a la funcion actualizar tarea en TaskList
  const handleSwitch = () => {
    const nuevoEstado = !estado
    setEstado(nuevoEstado)
    actualizarTarea(id, nuevoEstado)
  }

  //handleEliminar envia el id de la tarea a eliminar al TaskList
  const handleEliminar = () => {
    eliminarTarea(id);
  };

  const activarEdicion = () => {
    setModoEdicion(true);
  };
  
  const cancelarEdicion = () => {
    setModoEdicion(false);
    setNuevoNombre(nombre); // Restaurar el nombre original al cancelar
  };
  

  const handleEditarNombre = () => {
    
    // Realiza la edición del nombre
    editarTarea(id, nuevoNombre)
  
    // Salir del modo de edición
  };
  return (
    <>
      <div className="row">
        <div>
          {modoEdicion ? (
            <Form className='d-flex justify-content-start align-items-center'>
              <Form.Control
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                autoFocus
                maxLength={150}
                placeholder="Máximo 150 caracteres"
              />
              <div className="container">
              <Button onClick={() => handleEditarNombre()} variant="primary" className="float-left">
                Guardar
              </Button>
              <Button variant="primary" className="float-left" onClick={() => cancelarEdicion()}>
                Cancelar
              </Button>
              </div>
            </Form>
          ) : (
            <Form className='d-flex justify-content-start align-items-center'>
              <Form.Check
                type='switch'
                id='custom.switch'
                className='mr-3'
                onChange={handleSwitch}
                checked={estado}
              />
              {estado ? (
                <p className="text-decoration-line-through ms-2 text-break"> {nombre}</p>
              ) : (
                <p className="ms-2 text-break"> {nombre}</p>
              )}
            </Form>
          )}
        </div>
        {!modoEdicion && (
        <div className="container">
          <Button onClick={() => activarEdicion()} variant="primary" className="float-left" title='Editar'><CiEdit /></Button>
          <Button onClick={handleEliminar} variant="danger" className="float-left" title='Eliminar'><RiDeleteBin5Fill /></Button>
        </div>
        )}
      </div>
    </>
  )
}
