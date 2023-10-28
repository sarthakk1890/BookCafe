import React from 'react'
import './style.css'
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Link } from 'react-router-dom'
import { MdImportExport, MdExpandMore, MdPostAdd, MdAddCircleOutline, MdList, MdPeopleAlt, MdRateReview, MdDashboard } from 'react-icons/md'


const Sidebar = () => {
    return (
        <div className='sidebar noScroll'>
            <Link to='/admin/dashboard'>
                <p>
                    <MdDashboard />
                    Dashboard
                </p>
            </Link>

            <Link>
                <TreeView
                    defaultCollapseIcon={<MdExpandMore />}
                    defaultExpandIcon={<MdImportExport />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<MdPostAdd />} />
                        </Link>

                        <Link to="/admin/product">
                            <TreeItem nodeId="3" label="Create" icon={<MdAddCircleOutline />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/admin/orders">
                <p>
                    <MdList />
                    Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <MdPeopleAlt /> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <MdRateReview />
                    Reviews
                </p>
            </Link>


        </div>
    )
}

export default Sidebar
