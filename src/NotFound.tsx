import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/Button';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className='mt-10 text-xl font-semibold text-red-700'>
        존재하지 않는 페이지입니다
      </h1>
      <Button className='btn-back mt-5' onClick={() => navigate(-1)}>
        이전으로 돌아가기
      </Button>
    </>
  );
};
