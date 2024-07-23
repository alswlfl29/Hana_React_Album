/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from 'react';
import { useFetch } from '../hooks/fetch';
import { Button } from './ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import clsx from 'clsx';
import { PhotoImage } from './PhotoImage';
import { isLogin } from '../utils/isLogin';
import { AlbumType } from './AlbumList';
import { NotFound } from '../NotFound';
import { Loading } from './Loading';
import { ErrorMsg } from './ErrorMsg';

type AlbumDetail = {
  albumId: number;
  id: number;
  title: string;
  thumbnailUrl: string;
};

type ReducerType = {
  type: 'next' | 'prev';
  payload?: number;
};

const reducer = (
  { start, end }: { start: number; end: number },
  { type, payload = 12 }: ReducerType
) => {
  switch (type) {
    case 'next':
      start += payload;
      end += payload;
      return { start, end };
    case 'prev':
      start -= payload;
      end -= payload;
      return { start, end };
    default:
      return { start, end };
  }
};

export const AlbumDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [choiceAlbum, setChoiceAlbum] = useState<AlbumDetail[] | null>(null);
  const [{ start, end }, dispatch] = useReducer(reducer, { start: 0, end: 12 });

  const {
    data: albumInfo,
    error: albumInfoError,
    isLoading: albumInfoIsLoading,
  } = useFetch<AlbumType>({
    url: `/albums/${id}`,
    dependencies: [id],
  });

  const { data, error, isLoading } = useFetch<AlbumDetail[]>({
    url: `/photos?albumId=${id}`,
    dependencies: [id],
    defaultValue: [],
  });

  const isRemainedPhoto = choiceAlbum && end < choiceAlbum?.length;

  const nextPage = () => {
    if (!isRemainedPhoto) return;
    dispatch({ type: 'next' });
  };
  const prevPage = () => {
    if (start < 12) return;
    dispatch({ type: 'prev' });
  };

  useEffect(() => {
    if (!isLogin()) navigate('/');
  }, []);

  useEffect(() => {
    if (data) setChoiceAlbum(data);
  }, [data]);

  if (albumInfoIsLoading || isLoading) return <Loading />;
  if (albumInfoError || error) {
    if (albumInfoError === '404' || error === '404') {
      return <NotFound />;
    }
    <ErrorMsg err={error} />;
  }

  return (
    <div className='mt-8 w-full p-2'>
      <h1 className='text-xl font-semibold'>{albumInfo?.title}</h1>
      {choiceAlbum !== null && !choiceAlbum.length ? (
        <h1 className='text-center mt-10 text-base font-medium text-orange-600'>
          앨범에 저장된 사진이 없습니다
        </h1>
      ) : (
        <>
          <div className='grid grid-cols-4 gap-4 mt-5'>
            {choiceAlbum?.map(
              (album, idx) =>
                idx >= start &&
                idx < end && (
                  <div key={album.id}>
                    <PhotoImage src={album.thumbnailUrl} />
                  </div>
                )
            )}
          </div>
          <div className='mt-10'>
            <button onClick={prevPage} disabled={start < 12}>
              <FaCaretLeft
                size={30}
                className={clsx(start < 12 && 'text-gray-300 ')}
              />
            </button>
            <button onClick={nextPage} disabled={!isRemainedPhoto}>
              <FaCaretRight
                size={30}
                className={clsx(!isRemainedPhoto && 'text-gray-300 ')}
              />
            </button>
          </div>
        </>
      )}

      <Button
        className='btn-back mt-5 float-start'
        onClick={() => navigate('/albums')}
      >
        목록
      </Button>
    </div>
  );
};
