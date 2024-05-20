import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../features/SignupLogin/authSlice'; 
import { useAppDispatch } from '../store/hooks';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import logo2 from '../Assets/Logo2.png';
import '../App.css'

type FieldType = {
  email: string | undefined;
  password: string | undefined;
  remember?: string | undefined;
};




const LoginContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    dispatch(loginUser(values));
  
  
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='  apearFromLeft 	'>
      <div className='p-5'>
      <div className="w-full h-[100px] left-[310px] top-[245px] text-white text-[64px] font-semibold font-poppins flex justify-center items-center gap-2 sm:hidden ">
          <img src={logo2} alt="" className="Logo w-13 h-13 pt-2"/>
          <Link to={'/'} className='w-80 h-24'>RENOVO</Link>
        </div>


      <h3 className="text-black lg:text-sm font-normal text-center text-3xl hidden sm:block ">Welcome Back</h3>
      <h1 className="text-black lg:text-lg font-bold text-center text-3xl">Log in to you account</h1>
      </div>

      <Form
    name="basic"
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: '100%' }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className=' p-5 sm:flex sm:flex-col sm:items-center sm:justify-center md:pl-20'
    >
    <Form.Item<FieldType>
      label="email"
      name="email"
      rules={[{ required: true, message: 'Please input your username!' }]}
      className=' w-full m-0 sm:mb-5'
      >
      <Input className=' md:ml-6 p-2' />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
      className=' w-full m-0 sm:mb-5'

      >
      <Input.Password className='  p-2' />
    </Form.Item>
    <div className='grid sm:grid-cols-2 items-center justify-center w-full mt-5 sm:mt-0'>

    <Form.Item<FieldType>
      name="remember"
      valuePropName="checked"
      wrapperCol={{  span: 16 }}
      >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
    <Form.Item>
    <a href="#" className="text-sm text-black font-normal">Forgot Password?</a>    </Form.Item>

        </div>
    <Form.Item wrapperCol={{ span: 16 }}       className=' w-full '>
      <Button type="primary" htmlType="submit" className=' w-full md:ml-20 bg-black  '>
        Submit
      </Button>
    </Form.Item>
  </Form>
  <div className=' flex justify-center items-center gap-1 pr-10 pl-10 '>
    <hr className=' border border-b-slate-950 w-1/2'/>
    <p>Or</p>

    <hr className=' border border-b-slate-950 w-1/2'/>


  </div>
  <div className=" flex flex-col items-center justify-center  ">
        <button className=" bg-neutral-50 border border-zinc-100 text-zinc-600 py-3 rounded-lg mb-2 flex items-center gap-2 p-10">
          <img src="http://pluspng.com/img-png/google-logo-png-google-logo-icon-png-transparent-background-1000.png" alt="Google Icon" className="w-6 h-6" />
          <span>Log In with Google</span>
        </button>
        <button className=" bg-neutral-50 border border-zinc-100 text-zinc-600 py-3 rounded-lg mb-2 flex items-center gap-2 p-8">
          <img src="http://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19748.png" alt="Facebook Icon" className="w-6 h-6" />
          <span>Log In with Facebook</span>
        </button>
        <button className=" bg-neutral-50 border border-zinc-100 text-zinc-600 py-3 rounded-lg flex items-center gap-2 p-12">
          <img src="http://purepng.com/public/uploads/large/purepng.com-apple-logologobrand-logoiconslogos-251519938788qhgdl.png" alt="Apple Icon" className="w-6 h-6" />
          <span>Log In with Apple</span>
        </button>
        <div className=" mt-5">
        <span className="text-sm text-black font-normal">New User?</span>
        <Link to="signup" className="text-sm text-black font-bold ml-1 underline">SIGN UP HERE</Link>
      </div>
      </div>
  

      </div>
    
    
  );
}

export default LoginContainer;
