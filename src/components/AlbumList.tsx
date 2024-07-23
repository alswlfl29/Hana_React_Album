/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/fetch';
import { Button } from './ui/Button';
import { Album } from './Album';
import { useSession } from '../contexts/session-context';
import { useNavigate } from 'react-router-dom';
import { isLogin } from '../utils/isLogin';
import { Loading } from './Loading';
import { ErrorMsg } from './ErrorMsg';
import { useAlbum } from '../contexts/album-context';

export type AlbumType = { userId: number; id: number; title: string };

export const AlbumList = () => {
  const navigate = useNavigate();
  const {
    session: { loginUser },
  } = useSession();
  const { checkedAlbum } = useAlbum();
  const [albums, setAlbums] = useState<AlbumType[] | null>(null);
  const { data, error, isLoading } = useFetch<AlbumType[]>({
    url: `/albums?userId=${loginUser?.id}`,
    dependencies: [loginUser?.id],
    defaultValue: [],
  });

  useEffect(() => {
    if (!isLogin()) navigate('/');
  }, []);

  useEffect(() => {
    if (data) setAlbums(data);
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorMsg err={error} />;

  return (
    <div className='mt-8 w-full'>
      <div className='flex justify-around items-center'>
        <h1 className='text-3xl font-bold'>앨범 목록</h1>
        <Button
          onClick={() => navigate(`/albums/${checkedAlbum}`)}
          disabled={!checkedAlbum}
          className='btn-primary'
        >
          앨범 상세보기
        </Button>
      </div>
      <ul className='mt-7 p-5 flex flex-col text-start'>
        {!albums?.length && (
          <h1 className='text-center text-xl font-medium text-green-700'>
            존재하는 앨범이 없습니다.
          </h1>
        )}
        {albums &&
          albums.map((album) => <Album key={album.id} albumData={album} />)}
      </ul>
    </div>
  );
};

AlbumList.displayName = 'AlbumList';
