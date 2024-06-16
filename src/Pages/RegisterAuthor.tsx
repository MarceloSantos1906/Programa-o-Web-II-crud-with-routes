import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Table from '../Table/Table';
import Swal from 'sweetalert2';
import api from '../api';
import '../App.css';

function List() {
  const [author, setAuthor] = useState({
    name: ''
  });
  const [authors, setAuthors] = useState([]);

  const handleChange = (e) => {
    let NewAuthor = {
      ...author,
      [e.target.name]: e.target.value,
    };
    setAuthor(NewAuthor);
  };

  const cadastrar = () => {
    if (author.name == '') {
      toast.error('Nome  não pode ser vazio');
      return;
    }

    if (author.id) {
      api
        .patch('authors/${author.id}', author)
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Alterado com sucesso',
            showConfirmButton: false,
            timer: 10000,
          });
          setAuthor({ name: ''});
          getAuthors();
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
        .post('authors', author)
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cadastro efetuado com sucesso',
            showConfirmButton: false,
            timer: 10000,
          });
          setAuthor({ name: ''});
          getAuthors();
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

  async function getAuthors() {
    await api.get('authors').then((response) => setAuthors(response.data));
  }

  async function onEdit(id) {
    await api
      .get('authors/${id}')
      .then((response) => setAuthor(response.data));
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
            .delete('authors/${id}')
            .then((response) => {
              toast.done('Excluído com sucesso.');
              getAuthors();
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
            text: 'Autor foi deletado(a).',
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
    getAuthors();
  }, []);

  return (
    <>
      <div className="container">
        <h2>Cadastro de Autores</h2>
        <div className="mb-3">
          <label className="form-label">Nome: </label>
          <input
            type="text"
            name="name"
            defaultValue={author.name}
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
      <Table itens={authors} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}

export default List;
