import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Table from '../TableRegisterBooks/Table';
import Swal from 'sweetalert2';
import api from '../api';
import '../App.css';

function List() {
  const [book, setBook] = useState({
    name: '',
    image_url: '',
    genreId: '',
    authorsId: []
  });
  const [books, setBooks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: name === 'genreId' ? parseInt(value) : (name === 'authorsId' ? [parseInt(value)] : value),
    }));
  };

  const cadastrar = () => {
    if (book.name === '') {
      toast.error('Nome não pode ser vazio');
      return;
    } else if (book.image_url === '') {
      toast.error('Image URL não pode ser vazio');
      return;
    }

    if (book.id) {
      api
        .patch(`book/${book.id}`, book)
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Alterado com sucesso',
            showConfirmButton: false,
            timer: 10000,
          });
          setBook({
            name: '',
            image_url: '',
            genreId: 0,
            authorsId: []
          });
          getBooks();
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
        .post('book', book)
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cadastro efetuado com sucesso',
            showConfirmButton: false,
            timer: 10000,
          });
          setBook({
            name: '',
            image_url: '',
            genreId: 0,
            authorsId: []
          });
          getBooks();
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

  async function getBooks() {
    await api.get('book').then((response) => setBooks(response.data));
  }

  async function onEdit(id) {
    await api
      .get(`book/${id}`)
      .then((response) => setBook(response.data));
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
        text: 'Não será possível reverter!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`book/${id}`)
            .then((response) => {
              toast.done('Excluído com sucesso.');
              getBooks();
            })
            .catch((e) => {
              if (e.message.includes('404')) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Cadastro não encontrado',
                });
              } else {
                toast.error(e.message);
              }
            });
          swalWithBootstrapButtons.fire({
            title: 'Deletado!',
            text: 'Livro foi deletado.',
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
    getBooks();
  }, []);

  return (
    <>
      <div className="container">
        <h2>Register new Book</h2>
        <div className="mb-3">
          <label className="form-label">Name: </label>
          <input
            type="text"
            name="name"
            value={book.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL: </label>
          <input
            type="text"
            name="image_url"
            value={book.image_url}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Id Genre: </label>
          <input
            type="number"
            min="0"
            name="genreId"
            value={book.genreId}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Id Author: </label>
          <input
            type="number"
            min="0"
            name="authorsId"
            value={book.authorsId[0] || ''}
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
      </div>
      <Table items={books} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}
export default List;
