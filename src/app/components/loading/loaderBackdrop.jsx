import Animation from './animation';
import { Backdrop } from '@mui/material';

export default function Loader({ isLoading }) {
  return (
    <>
      {isLoading && (
        <Backdrop open={isLoading} sx={{ zIndex: 1301 }}>
          <Animation />
        </Backdrop>
      )}
    </>
  );
}
