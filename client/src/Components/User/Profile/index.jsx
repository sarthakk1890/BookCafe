import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../Layout/Loading';
import MetaData from '../../Layout/MetaData';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Profile = () => {
    const navigate = useNavigate();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate, isAuthenticated]);

    return (
        <Fragment>
            {loading ? (
                <Loading />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`} />
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            {user.avatar && (
                                <img src={user.avatar.url} alt={user.name} />
                            )}
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substring(0, 10)}</p>
                            </div>
                            <div>
                                <Link to="/orders/me">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;
