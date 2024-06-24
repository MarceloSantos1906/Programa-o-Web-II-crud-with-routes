import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Table from '../TableEmployees/Table';
import Swal from 'sweetalert2';
import api from '../api';
import '../App.css';

function List() {
  const [person, setPerson] = useState({
    name: '',
    email: ''
  });
  const [persons, setPersons] = useState([]);

  const handleChange = (e) => {
    let newPerson = {
      ...person,
      [e.target.name]: e.target.value,
    };
    setPerson(newPerson);
  };

  const cadastrar = () => {
    if (person.name == '') {
      toast.error('Nome  não pode ser vazio');
      return;
    } else if (person.email == '') {
      toast.error('Email não pode ser vazio');
      return;
    }

    if (person.id) {
      api
        .patch('person/${person.id}', person)
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Alterado com sucesso',
            showConfirmButton: false,
            timer: 10000,
          });
          setPerson({ name: '', email: ''});
          getPersons();
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
        .post('person', person)
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cadastro efetuado com sucesso',
            showConfirmButton: false,
            timer: 10000,
          });
          setPerson({ name: '', email: ''});
          getPersons();
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

  async function getPersons() {
    await api.get('person').then((response) => setPersons(response.data));
  }

  async function onEdit(id) {
    await api
      .get('person/${id}')
      .then((response) => setPerson(response.data));
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
            .delete('person/${id}')
            .then((response) => {
              toast.done('Excluído com sucesso.');
              getPersons();
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
            text: 'Pessoa foi deletada.',
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
    getPersons();
  }, []);

  return (
    <>
      <div className="container">
        <h2>Cadastro de Pessoas</h2>
        <div className="mb-3">
          <label class="form-label">Nome: </label>
          <input
            type="text"
            name="name"
            defaultValue={person.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label class="form-label">Email: </label>
          <input
            type="text"
            name="email"
            defaultValue={person.email}
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
      <Table itens={persons} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}

export default List;
