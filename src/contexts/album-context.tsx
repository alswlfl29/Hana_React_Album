/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useContext, useState } from 'react';

type AlbumContextProp = {
  checkedAlbum: number | null;
  handlecheckedAlbum: (id: number) => void;
};
const AlbumContext = createContext<AlbumContextProp>({
  checkedAlbum: null,
  handlecheckedAlbum: () => {},
});

export const AlbumProvider = ({ children }: PropsWithChildren) => {
  const [checkedAlbum, setCheckedAlbum] = useState<number | null>(null);

  const handlecheckedAlbum = (id: number) => setCheckedAlbum(id);

  return (
    <AlbumContext.Provider value={{ checkedAlbum, handlecheckedAlbum }}>
      {children}
    </AlbumContext.Provider>
  );
};

export const useAlbum = () => useContext(AlbumContext);
