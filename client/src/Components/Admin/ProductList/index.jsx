import React, { Fragment, useEffect } from 'react'
import './style.css'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getAdminProduct, deleteProduct } from '../../../actions/productAction';
import Button from '@mui/material/Button';
import MetaData from "../../Layout/MetaData";
import SideBar from "../Sidebar";
import { MdModeEditOutline, MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { DELETE_PRODUCT_RESET } from '../../../constants/productConstant';

const ProductList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.productDeleteUpdate)

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  }

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError, { autoClose: 3000 });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully", { autoClose: 3000 });
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/products/${params.row.id}`}>
              <MdModeEditOutline />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.row.id)
              }
            >
              <MdDelete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default ProductList
