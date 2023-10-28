import React, { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./style.css"
import { saveShippingInfo } from "../../../actions/cartAction"
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../Layout/MetaData'
import { toast } from 'react-toastify'
import { BsFillBuildingsFill, BsFillTelephoneFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { ImBooks } from 'react-icons/im'
import { MdMenuBook } from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa6'
import CheckoutSteps from '../CheckoutSteps'

const Shipping = () => {

    const Branches = [
        "ECE",
        "CSE",
        "IT",
        "Mechanical",
        "Electrical",
        "Civil"
    ]

    const Semester = [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
    ]

    const Courses = [
        "B.Tech.",
        "M.Tech."
    ]

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [roomNumber, setRoomNumber] = useState(shippingInfo.roomNumber);
    const [hostel, setHostel] = useState(shippingInfo.hostel);
    const [branch, setBranch] = useState(shippingInfo.branch);
    const [course, setCourse] = useState(shippingInfo.course);
    const [semester, setSemester] = useState(shippingInfo.semester);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            toast.error("Enter a valid Phone Number", { autoClose: 2000 })
            return;
        }
        dispatch(
            saveShippingInfo({ roomNumber, hostel, branch, course, semester, phoneNo })
        );
        navigate("/order/confirm")
    }

    return (
        <Fragment className='shippingMain'>
            <MetaData title={"Shipping Details"} />

            <CheckoutSteps activeStep={0} />
            <div className="shippingContainer center">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form
                        className="shippingForm"
                        encType='multipart/form-data'
                        onSubmit={shippingSubmit}
                    >

                        <div>
                            <AiFillHome />
                            <input
                                type="text"
                                placeholder='Room Number'
                                required
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                            />
                        </div>

                        <div>
                            <BsFillBuildingsFill />
                            <input
                                type="text"
                                placeholder='Hostel Name'
                                required
                                value={hostel}
                                onChange={(e) => setHostel(e.target.value)}
                            />
                        </div>

                        <div>
                            <ImBooks />
                            <select
                                required
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            >
                                <option value="">Course</option>
                                {
                                    Courses &&
                                    Courses.map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>

                        {course && <div>
                            <MdMenuBook />
                            <select
                                required
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                            >
                                <option value="">Branch</option>
                                {
                                    Branches &&
                                    Branches.map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>}

                        {branch && <div>
                            <FaGraduationCap />
                            <select
                                required
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                            >
                                <option value="">Semester</option>
                                {
                                    Semester &&
                                    Semester.map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>}

                        <div>
                            <BsFillTelephoneFill />
                            <input
                                type="text"
                                placeholder='Phone Number'
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>

                        <input type="submit" value="Continue" className="shippingBtn" />
                    </form>

                </div>
            </div>
        </Fragment>
    )
}

export default Shipping
