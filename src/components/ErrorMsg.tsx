export const ErrorMsg = ({ err }: { err: string }) => {
  return (
    <h1 className='mt-8 text-2xl text-center font-semibold text-red-600'>
      {err}
    </h1>
  );
};
