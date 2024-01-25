import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TextButton from "../components/Button/TextButton";
import LoadingModal from "../components/Loading";
import moment from "moment/moment";
import { InputSingleField } from "../components/Field/InputField";
import { fetchAttendance } from "../config/api/services";

function AttendancePage() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    async function getAttendanceStaff() {
        try {
            setLoading(true);
            
            const res = await fetchAttendance({ from: start, to: end, page: 1, limit: 100 });

            setData(res);

            setLoading(false);
        } catch (error) {
            toast(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        setStart(moment(
            `${moment().startOf('month').format('YYYY-MM-DD')} ${'00:00'}`,
            'YYYY-MM-DD HH:mm'
        ).format('YYYY-MM-DD'))
        setEnd(moment().format('YYYY-MM-DD'));

        getAttendanceStaff();
    }, [])

    return (
        <div className="py-5 px-5 md:p-[50px] md:py-10">
            <p className="text-lg md:text-2xl text-center">Riwayat Absensi</p>
            <div className="flex flex-col md:flex-row w-full md:w-[75%] mx-auto items-end justify-between gap-4 md:gap-10 mt-10">
                <InputSingleField label={'From'} labelColor={'text-black'} value={start} onChange={(e) => setStart(e.target.value)} type={'date'}  />
                <InputSingleField label={'To'} labelColor={'text-black'} value={end} onChange={(e) => setEnd(e.target.value)} type={'date'}  />
                <TextButton title={'Cari'} onClick={() => getAttendanceStaff()} />
            </div>
            <table className="table-fixed mt-10">
                <thead>
                    <tr>
                        <th className="w-[50vw] border">Masuk</th>
                        <th className="w-[50vw] border">Pulang</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((data) => {
                            return(
                                <tr key={data.id} className="text-center">
                                    <td className="border">{data[0].attendance === 'IN' ? `${moment(data[0].clockDate).format('YYYY-MM-DD')} ${moment(data[0].clockTime).format('HH:mm')}` : `${moment(data[1].clockDate).format('YYYY-MM-DD')} ${moment(data[1].clockTime).format('HH:mm')}`}</td>
                                    <td className="border">{data[1].attendance === 'OUT' ? `${moment(data[1].clockDate).format('YYYY-MM-DD')} ${moment(data[1].clockTime).format('HH:mm')}` : `${moment(data[1].clockDate).format('YYYY-MM-DD')} ${moment(data[1].clockTime).format('HH:mm')}`}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
           
            <LoadingModal open={loading} />
        </div>
    );
}

export default AttendancePage;
