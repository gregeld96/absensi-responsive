import { Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../Loading";

const MainLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const token = sessionStorage.getItem('accessToken');

        if(!token) navigate('/auths/sign-in');
        setLoading(false);
    }, [])

    return(
        <>
            <LoadingModal open={loading} />
            <div className="flex justify-between items-center  p-6">
                <div className="flex gap-[16px]">
                    <p onClick={() => navigate('/')} className="md:text-lg xl:text-xl cursor-pointer font-bold">Home</p>
                    <p onClick={() => navigate('/attendances')} className="md:text-lg xl:text-xl cursor-pointer font-bold">Absensi</p>
                </div>
                <FaUserCircle onClick={() => navigate('/accounts')} className="cursor-pointer" size={24} />
            </div>
            <Outlet />
        </>
    )
};

export default MainLayout;
