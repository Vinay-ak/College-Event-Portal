import React from 'react'
import {useForm} from "react-hook-form";
import Loading from './Loader';
import TextBox from './TextBox';
import ModalWrapper from "./ModelWrapper.jsx";
import Button from "./Button";
import { Dialog } from '@headlessui/react'
import {toast} from "sonner";
import { useChangePasswordMutation } from '../redux/slices/api/userApiSlice.js';

const ChangePassword = ({open,setOpen}) => {
    const {register,handleSubmit,formState:{errors},}= useForm();
    const [changeUserPassword,{isLoading}]=useChangePasswordMutation();

    const handleOnSubmit=async (data)=>{
        if(data.password!== data.cpass){
            toast.warning(("Passwords do not match"));
            return;
        }
        try {
            const res=await changeUserPassword(data).unwrap();
            toast.success("New user added successfully");

            setTimeout(()=>{
                setOpen(false);
            },1500);
        } catch (error) {
            console.log(error);
        }
    }
   
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
      <Dialog.Title
      as='h2'
      className='text-base font-bold leading-6 text-gray-900 mb-4'>
     Change Password
      </Dialog.Title>
      <div className='mt-2 flex flex-col gap-6'>
      <TextBox
      placeholder='New Password'
      type='password'
      name='password'
      label='new password'
      className='w-full rounded'
      register={register("password",{
        required:"New password is required"
      })}
      error={errors.password?errors.password.message:""}>
      </TextBox>
      <TextBox 
      placeholder='Confirm new password'
      type='password'
      name='cpass'
      label='Confirm new password'
      className='w-full rounded'
      register={register("cpass",{
        required:"Confirm New Password is required"
      })}
      error={errors.cpass?errors.cpass.message:""}>
      </TextBox>
      </div>
      {isLoading?(
        <div className='py-5'>
        <Loading/>
        </div>
      ):(
        <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
        <Button
            type='submit'
            className='bg-orange-500 px-8 text-sm font-semibold text-white hover:bg-orange-400'
            label='Save'   
        />
        <button
        type='button'
        className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
        onClick={()=>setOpen(false)}>
        Cancel
        </button>

        </div>
      )}

      </form>

      </ModalWrapper>
    </>
  )
}

export default ChangePassword