import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Table from '../Table/Table';
import Swal from 'sweetalert2';
import api from '../api';
import '../App.css';

function List() {
  const [genre, setGenre] = useState({
    name: ''
  });
  const [genres, setGenres] = useState([]);

  const handleChange = (e) => {
    let NewGenres = {
      ...genre,
      [e.target.name]: e.target.value,
    };
    setGenre(NewGenres);
  };

  const cadastrar = () => {
    if (genre.name == '') {
      toast.error('Nome  não pode ser vazio');
      return;
    }

    if (genre.id) {
      api
        .patch('genres/${genre.id}', genre)
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Alterado com sucesso',
            showConfirmButton: false,
            timer: 10000,
          });
          setGenre({ name: ''});
          getGenres();
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
        .post('genres', genre)
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cadastro efetuado com sucesso',
            showConfirmButton: false,
            timer: 10000,
          });
          setGenre({ name: ''});
          getGenres();
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

  async function getGenres() {
    await api.get('genres').then((response) => setGenres(response.data));
  }

  async function onEdit(id) {
    await api
      .get('genres/${id}')
      .then((response) => setGenre(response.data));
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
            .delete('genres/${id}')
            .then((response) => {
              toast.done('Excluído com sucesso.');
              getGenres();
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
            text: 'Genero foi deletada.',
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
    getGenres();
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
            defaultValue={genre.name}
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
      <Table itens={genres} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}

export default List;
