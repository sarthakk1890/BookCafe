import React, { Fragment, useEffect } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, myOrders } from '../../../actions/orderAction'
import Loading from '../../Layout/Loading'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography';
import MetaData from '../../Layout/MetaData'
import { DataGrid } from '@mui/x-data-grid';
import { MdLaunch } from "react-icons/md"


const MyOrders = () => {

  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders)
  const { user } = useSelector((state) => state.user);

  function jsDateConvert(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 300,
      flex: 0.3
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5
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
          <Link to={`/order/${params.row.id}`}>
            <MdLaunch />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
        date: jsDateConvert(item.createdAt),
      })
    })


  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
      dispatch(clearErrors());
    }
    dispatch(myOrders())
  }, [error, dispatch])

  return (
    <Fragment>
      <MetaData title={`${user.name} Orders`} />
      {
        loading ? <Loading /> : (
          <div className='myOrdersPage'>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className='myOrdersTable noScroll'
              autoHeight
              rowHeight={30}
            />

            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          </div>

        )
      }
    </Fragment>
  )
}

export default MyOrders
