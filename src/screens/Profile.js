import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextButton from "../components/Button/TextButton";
import LoadingModal from "../components/Loading";
import { fetchUserProfile } from "../config/api/services";
import ModifyPasswordModal from "../components/Modal/ModifyPassword";
import ModifyProfileModal from "../components/Modal/ModifyProfile";

function ProfilePage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [openPassword, setOpenPassword] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    async function getUserProfile() {
        try {
            setLoading(true);
            
            const res = await fetchUserProfile();
            console.log(res);

            setData(res);

            setLoading(false);
        } catch (error) {
            toast(error.message);
            setLoading(false);
        }
    }

    async function logout() {
        sessionStorage.removeItem('accessToken');

        navigate('/auths/sign-in');
    }

    useEffect(() => {
        getUserProfile();
    }, [])

    return (
        <div className="py-5 px-5 md:p-[50px] md:py-10">
            <div className="flex justify-center items-center">
                {
                    data?.information?.profile ? <div
                        style={{
                            backgroundImage: `url(${process.env.REACT_APP_BASE_URL}${data?.information?.profile.replace('public/', "")})`,
                            backgroundSize: 'cover',
                            marginInline: "auto",
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        }}
                        className={`flex relative h-[160px] w-[160px] justify-center items-center text-xl rounded-full mr-4 text-white bg-white`}
                    ></div> :  <div className="bg-black rounded-full h-[160px] w-[160px] overflow-hidden">

                    </div> 
                }
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-5">
                <div className="my-4">
                    <p className="">Nama</p>
                    <p className="font-bold text-xl">{data?.information?.name}</p>
                </div>
                <div className="my-4">
                    <p className="">Email</p>
                    <p className="font-bold text-xl">{data?.email}</p>
                </div>
                <div className="my-4">
                    <div className="flex gap-3 items-center">
                        <p className="">Telepon</p> <p className="underline text-blue-500 font-medium text-sm cursor-pointer" onClick={() => setOpenProfile(true)}>ubah</p>
                    </div>
                    <p className="font-bold text-xl">{data?.phone || '-'}</p>
                </div>
                <div className="my-4">
                    <p className="">Posisi</p>
                    <p className="font-bold text-xl">{data?.information?.position}</p>
                </div>
            </div>
            <div className="flex gap-10 justify-between items-center max-w-[550px] mx-auto">
                <TextButton title={'Logout'} bgColor={'bg-[#232323]'} onClick={() => logout()} />
                <TextButton title={'Perubahan Keamanan'} onClick={() => setOpenPassword(true)} />
            </div>

            { openPassword && <ModifyPasswordModal open={openPassword} onClose={() => setOpenPassword(false)} onLoading={(e) => setLoading(e)} /> }
            { openProfile && <ModifyProfileModal open={openProfile} onClose={() => setOpenProfile(false)} onLoading={(e) => setLoading(e)} /> }
            <LoadingModal open={loading} />
        </div>
    );
}

export default ProfilePage;
