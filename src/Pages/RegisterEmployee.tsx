import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Table from '../TableAuthors/Table';
import Swal from 'sweetalert2';
import api from '../api';
import '../App.css';

function List() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [employees, setEmployees] = useState([]);

  const handleChange = (e) => {
    let newPerson = {
      ...employee,
      [e.target.name]: e.target.value,
    };
    setEmployee(newPerson);
  };

  const cadastrar = () => {
    if (employee.name == '') {
      toast.error('Nome  não pode ser vazio');
      return;
    } else if (employee.email == '') {
      toast.error('Email não pode ser vazio');
      return;
    }

    if (employee.id) {
      api
        .patch('person/employee/${employee.id}', employee)
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Alterado com sucesso',
            showConfirmButton: false,
            timer: 10000,
          });
          setEmployee({ name: '', email: ''});
          getEmployees();
        })
        .catch((e) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao efetuar o cadastro: ' + e,
          });
        });
    } else {
      api
        .post('person/employee', employee)
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cadastro efetuado com sucesso',
            showConfirmButton: false,
            timer: 10000,
          });
          setEmployee({ name: '', email: ''});
          getEmployees();
        })
        .catch((e) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao efetuar o cadastro: ' + e,
          });
        });
    }
  };

  async function getEmployees() {
    await api.get('person/employee').then((response) => setEmployees(response.data));
  }

  async function onEdit(id) {
    await api
      .get('person/${id}')
      .then((response) => setEmployee(response.data));
  }

  function onDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Tem certeza que deseja excluir?',
        text: 'Não será possivel reverter!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          api
            .delete('person/employee/${id}')
            .then((response) => {
              toast.done('Excluído com sucesso.');
              getEmployees();
            })
            .catch((e) => {
              if (e == 'AxiosError: Request failed with status code 404') {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Cadastro não encontrado',
                });
              } else {
                toast.error(e);
              }
            });
          swalWithBootstrapButtons.fire({
            title: 'Deletado!',
            text: 'Funcionario foi deletado.',
            icon: 'success',
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelado',
            icon: 'error',
          });
        }
      });
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <div className="container">
        <h2>Cadastro de Funcionarios</h2>
        <div className="mb-3">
          <label class="form-label">Nome: </label>
          <input
            type="text"
            name="name"
            defaultValue={employee.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label class="form-label">Email: </label>
          <input
            type="text"
            name="email"
            defaultValue={employee.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label class="form-label">Senha: </label>
          <input
            type="password"
            name="password"
            defaultValue={employee.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <button
            type="button"
            key="button"
            className="btn btn-success"
            onClick={cadastrar}
          >
            Cadastrar
          </button>
        </div>
        <ToastContainer />
      </div>
      <Table itens={employees} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}

export default List;
