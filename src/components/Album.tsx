import clsx from 'clsx';
import { AlbumType } from './AlbumList';
import { useAlbum } from '../contexts/album-context';

type Props = {
  albumData: AlbumType;
};

export const Album = ({ albumData }: Props) => {
  const { checkedAlbum, handlecheckedAlbum } = useAlbum();
  return (
    <li className='text-base mb-5'>
      <button
        onClick={() => handlecheckedAlbum(albumData.id)}
        className={clsx(
          {
            'text-lime-700 border border-lime-700 rounded-md p-1 text-start':
              checkedAlbum === albumData?.id,
          },
          'text-start',
          'hover:text-lime-600'
        )}
      >
        {albumData?.id}.
        <strong className='font-semibold ml-3'>{albumData?.title}</strong>
      </button>
    </li>
  );
};
