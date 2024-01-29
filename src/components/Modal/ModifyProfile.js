import { useState } from "react";
import BaseModal from "./BaseModal";
import TextButton from "../Button/TextButton";
import { toast } from "react-toastify";
import { InputSingleField } from "../Field/InputField";
import { updateProfile, uploadDocument } from "../../config/api/services";


function ModifyProfileModal({ open, onClose, onLoading, }) {
    const [profile, setProfile] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');

    async function changeProfile() {
        try {
            onLoading(true);

            const payload = new FormData();

            let res = null;

            if(profile){
              payload.append('profile-pic', profile);
  
              res = await uploadDocument(payload);
            }

            await updateProfile({
                phone: phoneNumber,
                profile: res?.path ? res?.path : null
            });

            toast('Berhasil merubah identitas diri');
            onLoading(false);
            onClose();
        } catch (error) {
            onLoading(false);
            toast(error?.message)
        }
    }

    return (
      <BaseModal open={open}>
        <p className="text-center text-2xl font-bold mb-5">Perubahan Identitas</p>
        <div className="flex flex-col gap-5 px-10">
        <div className="border h-[150px] w-[150px] mx-auto mb-5">
              {profile ? (
                <label
                  className="flex justify-center items-center h-[100%]"
                  htmlFor={`file-profile`}
                >
                  <img
                    src={URL.createObjectURL(profile)}
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                </label>
              ) : (
                <label
                  className="flex justify-center items-center h-[100%]"
                  htmlFor={`file-profile`}
                >
                  Document
                </label>
              )}
              <input type="file" accept=".png,.jpg,.jpeg" hidden id={`file-profile`} onChange={(e) => setProfile(e.target.files[0])} />
            </div>
            <InputSingleField value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type={'phone'} label={'No. Telepon'} labelColor={'text-black'} labelWeight={'font-medium'} />
            <div className="mt-6 flex flex-col gap-5">
                <TextButton title={'Ubah'} onClick={() => changeProfile()} />
                <TextButton title={'Tutup'} bgColor={'bg-black'} onClick={() => onClose()} />
            </div>
        </div>
      </BaseModal>
    );
  }
  
  export default ModifyProfileModal;
  