import { IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Link from 'next/link';

export default function PersonalAccount({ onOpenAccountModal, isLogin }) {
  return (
    <>
      {isLogin ? (
        <Link href="/profile/settings">
          <IconButton
            color="inherit"
            aria-label="personal account"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <AccountCircleOutlinedIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Link>
      ) : (
        <IconButton
          color="inherit"
          aria-label="personal account"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={onOpenAccountModal}
        >
          <LoginIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    </>
  );
}
