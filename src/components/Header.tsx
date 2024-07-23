import { Button } from './ui/Button';
import { getStorage } from '../utils/Storage';
import { useSession } from '../contexts/session-context';
import { isLogin } from '../utils/isLogin';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const { logout } = useSession();

  return (
    <div className='flex w-full justify-between bg-emerald-500 p-4 border rounded-xl'>
      <h1 className='text-2xl text-white font-semibold ml-3'>Hanaro Album</h1>
      {isLogin() && (
        <div className={'flex justify-center items-center mr-3 gap-3'}>
          <div className='flex justify-center items-center gap-2'>
            <span className='text-sm text-gray-700'>
              {getStorage().loginUser?.id}
            </span>
            <span className='text-lg text-black font-medium'>
              {getStorage().loginUser?.username}
            </span>
          </div>
          <Button
            onClick={() => logout() && navigate('/')}
            className='btn-account'
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
};
