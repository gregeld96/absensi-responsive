import { useState } from "react";
import BaseModal from "./BaseModal";
import { PasswordField } from "../Field/PasswordField";
import TextButton from "../Button/TextButton";
import { toast } from "react-toastify";
import { updatePassword } from "../../config/api/services";


function ModifyPasswordModal({ open, onClose, onLoading, }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function changePassword() {
        try {
            onLoading(true);

            await updatePassword({
                oldPassword,
                newPassword,
                confirmPassword,
            });

            toast('Berhasil merubah password');
            onLoading(false);
            onClose();
        } catch (error) {
            onLoading(false);
            toast(error?.message)
        }
    }

    return (
      <BaseModal open={open}>
        <p className="text-center text-2xl font-bold mb-5">Perubahan Password</p>
        <div className="flex flex-col gap-5 px-10">
            <PasswordField value={oldPassword} label={'Password Saat Ini'} labelColor={'text-black'} labelWeight={'font-medium'} onChange={(e) => setOldPassword(e.target.value)} />
            <PasswordField value={newPassword} label={'Password Baru'} labelColor={'text-black'} labelWeight={'font-medium'} onChange={(e) => setNewPassword(e.target.value)} />
            <PasswordField value={confirmPassword} label={'Konfirmasi Password Baru'} labelColor={'text-black'} labelWeight={'font-medium'} onChange={(e) => setConfirmPassword(e.target.value)} />
            <div className="mt-6 flex flex-col gap-5">
                <TextButton title={'Ubah'} onClick={() => changePassword()} />
                <TextButton title={'Tutup'} bgColor={'bg-black'} onClick={() => onClose()} />
            </div>
        </div>
      </BaseModal>
    );
  }
  
  export default ModifyPasswordModal;
  