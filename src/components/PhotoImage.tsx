import clsx from 'clsx';
import { useState } from 'react';

export const PhotoImage = ({ src }: { src: string }) => {
  const [isImgLoading, setIsImgLoading] = useState(true);

  return (
    <>
      <div
        className={clsx(
          isImgLoading
            ? 'flex justify-center items-center bg-gray-300 border text-sm text-gray-500 '
            : 'hidden'
        )}
      >
        Loading
      </div>
      <img
        src={src}
        onLoad={() => setIsImgLoading(false)}
        className={clsx(isImgLoading ? 'hidden' : 'block')}
        alt='album thumbnail'
      />
    </>
  );
};
