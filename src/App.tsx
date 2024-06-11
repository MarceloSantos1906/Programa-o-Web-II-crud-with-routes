import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Table from './Table/Table';
import Swal from 'sweetalert2';
import api from './api';
import './App.css';

function List() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    let newProduct = {
      ...product,
      [e.target.name]: e.target.value,
    };
    setProduct(newProduct);
  };

  const cadastrar = () => {
    if (product.name == '') {
      toast.error('Nome  não pode ser vazio');
      return;
    } else if (Number(product.price) <= 0) {
      toast.error('Salario não pode ser negativo');
      return;
    } else if (product.price == '') {
      toast.error('Salario não pode ser vazio');
      return;
    }

    if (product.id) {
      api
        .patch(`products/${product.id}`, product)
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Alterado com sucesso',
            showConfirmButton: false,
            timer: 10000,
          });
          setProduct({ name: '', price: '', description: '' });
          getProducts();
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
        .post('products', product)
        .then((response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cadastro efetuado com sucesso',
            showConfirmButton: false,
            timer: 10000,
          });
          setProduct({ name: '', price: '', description: '' });
          getProducts();
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

  async function getProducts() {
    await api.get('products').then((response) => setProducts(response.data));
  }

  async function onEdit(id) {
    await api
      .get(`products/${id}`)
      .then((response) => setProduct(response.data));
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
            .delete(`products/${id}`)
            .then((response) => {
              toast.done('Excluído com sucesso.');
              getProducts();
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
    getProducts();
  }, []);

  return (
    <>
      <div className="container">
        <h2>Cadastro de products</h2>
        <div className="mb-3">
          <label class="form-label">Nome: </label>
          <input
            type="text"
            name="name"
            defaultValue={product.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label class="form-label">Preço: </label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="price"
            defaultValue={product.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label class="form-label">Descrição: </label>
          <input
            type="text"
            name="description"
            defaultValue={product.description}
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
      <Table itens={products} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}

export default List;
