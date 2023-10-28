import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, deleteOrder, getAllOrders } from '../../../actions/orderAction';
import Button from '@mui/material/Button';
import MetaData from "../../Layout/MetaData";
import SideBar from "../Sidebar";
import { MdModeEditOutline, MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { DELETE_ORDER_RESET } from '../../../constants/orderConstant';

const OrderList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order)

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
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
            toast.success("Order Deleted Successfully", { autoClose: 3000 });
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, isDeleted, navigate]);

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
                    <Fragment>
                        <Link to={`/admin/order/${params.row.id}`}>
                            <MdModeEditOutline />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteOrderHandler(params.row.id)
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

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                date: jsDateConvert(item.createdAt),
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL Orders - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>

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

export default OrderList
