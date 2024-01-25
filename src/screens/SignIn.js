import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputSingleField } from "../components/Field/InputField";
import { PasswordField } from "../components/Field/PasswordField";
import TextButton from "../components/Button/TextButton";
import LoadingModal from "../components/Loading";
import { login } from "../config/api/services";
import { toast } from "react-toastify";

function SignInPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setLoading(true);
        const token = sessionStorage.getItem('accessToken');

        if(token) navigate('/');
        setLoading(false);
    }, []);

    async function submit() {
        try {
            setLoading(true);

            const res = await login({
                email,
                password
            });

            sessionStorage.setItem('accessToken', res.accessToken);

            toast('Success Login!');
            setLoading(false);
            navigate('/');
        } catch (error) {
            toast(error.message);
            setLoading(false);
        }
    }

    return (
        <div className="py-5 px-5 md:p-[50px] md:py-10 h-[100vh] flex items-center justify-center">
            <div className="border bg-white rounded pb-8 px-3 w-full max-w-[550px]">
                <p className="my-5 text-xl font-semibold">Login Account</p>
                <div className="my-2">
                    <InputSingleField
                        labelColor={"text-black"}
                        labelWeight={"font-bold"}
                        value={email}
                        type={"email"}
                        placeholder={""}
                        required={true}
                        label={"Email"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-2">
                    <PasswordField
                        labelColor={"text-black"}
                        labelWeight={"font-bold"}
                        value={password}
                        placeholder={""}
                        label={"Password"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <TextButton title={"Sign In"} onClick={() => submit()} />
                </div>
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default SignInPage;
