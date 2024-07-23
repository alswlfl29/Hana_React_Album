/* eslint-disable react-hooks/exhaustive-deps */
import { FaUser } from 'react-icons/fa';
import { Button } from './ui/Button';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/session-context';
import { useFetch } from '../hooks/fetch';
import { isLogin } from '../utils/isLogin';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useSession();
  const idRef = useRef<HTMLInputElement | null>(null);
  const [checkId, setCheckId] = useState(0);
  const [disable, setDisable] = useState('');
  const { data } = useFetch<LoginUser>({
    url: `/users/${checkId}`,
    enable: !!checkId,
    dependencies: [checkId],
  });

  const focusId = idRef.current?.focus();

  const sendLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Number(idRef.current?.value);
    if (!id || isNaN(id)) {
      focusId;
      setDisable('User ID를 입력해주세요.');
      return;
    }

    if (id > 10 || id < 1) {
      focusId;
      if (idRef.current) idRef.current.value = '';
      setDisable('User ID는 1~10번만 가능합니다.');
      return;
    }

    setCheckId(id);
  };

  useEffect(() => {
    focusId;
  }, []);

  useEffect(() => {
    if (isLogin() || (data && login(data.id, data.username)))
      navigate('/albums');
  }, [data]);

  return (
    <div className='w-full mt-8'>
      <form
        className='flex justify-center items-center mb-3'
        onSubmit={sendLogin}
      >
        <div className='flex justify-between items-center border border-gray-300 rounded-lg w-2/5 mr-10 bg-white'>
          <FaUser size={'1.3rem'} className='ml-3' />
          <input
            type='number'
            className='border border-none rounded-lg p-2 w-5/6 focus:outline-none placeholder:text-xs'
            placeholder='User ID를 입력하세요.(1~10)'
            ref={idRef}
          />
        </div>
        <Button type='submit' className='btn-account'>
          Sign In
        </Button>
      </form>
      {disable && (
        <div className='text-red-500 text-sm font-semibold'>{disable}</div>
      )}
    </div>
  );
};
