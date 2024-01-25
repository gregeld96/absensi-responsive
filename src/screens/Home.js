import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextButton from "../components/Button/TextButton";
import LoadingModal from "../components/Loading";
import { clockSubmitUser, getUserAttendanceToday } from "../config/api/services";
import moment from "moment/moment";

function HomePage() {
    const [loading, setLoading] = useState(false);
    const [clockIn, setClockIn] = useState(null);
    const [clockOut, setClockOut] = useState(null);

    async function getAttendanceStatusStaff({ type }) {
        try {
            setLoading(true);
            
            const res = await getUserAttendanceToday({
                type: type
            });
            
            console.log(res);

            if(res){
                if(type === 'IN'){
                    setClockIn(res)
                } else {
                    setClockOut(res)
                }
            }

            setLoading(false);
        } catch (error) {
            toast(error.message);
            setLoading(false);
        }
    }

    async function clockStatusSubmit({ type }) {
        try {
            setLoading(true);
            
            await clockSubmitUser({ type });

            await getAttendanceStatusStaff({ type })

            toast('Success Clock In!');
            setLoading(false);
        } catch (error) {
            toast(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        getAttendanceStatusStaff({ type: 'IN' });
        getAttendanceStatusStaff({ type: 'OUT' });
    }, [])

    return (
        <div className="py-5 px-5 md:p-[50px] md:py-10 h-[80vh] flex items-center justify-center">
            <div className="border bg-white rounded pb-4 px-3 w-full max-w-[550px]">
                <p className="my-5 text-xl font-semibold text-center">{clockOut ? 'Absensi Pulang' : clockIn ? 'Absensi Masuk' : 'Absensi Pekerja'}</p>
                {
                    clockIn ? <div className="my-5">
                        <p className="font-semibold text-[#07638d] text-center">{moment(clockOut ? clockOut.clockDate : clockIn?.clockDate).format('DD MMMM YYYY')}</p>
                        <p className="font-bold text-lg text-[#07638d] text-center">{moment(clockOut ? clockOut.clockTime : clockIn?.clockTime).format('hh:mm')}</p>
                    </div> : null
                }
                <div className={`${clockIn ? 'mb-5' : 'my-5'} flex gap-[40px]`}>
                    <TextButton disable={clockIn ? true : false} title={'Clock In'} onClick={() => clockStatusSubmit({ type: 'IN' })} />
                    {
                        clockIn ? <TextButton  disable={clockOut ? true : false} title={'Clock Out'} onClick={() => clockStatusSubmit({ type: 'OUT' })} /> : null
                    }
                    
                </div>
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default HomePage;
