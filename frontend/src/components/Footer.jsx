import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Address = () => {
  return (
    <Typography variant='body2' color='text.secondary'>
      Address: Da Nang, Viet Nam
    </Typography>
  );
};

const Contact = () => {
  return (
    <Typography variant='body2' color='text.secondary'>
      Contact: 0328404225
    </Typography>
  );
};

const Email = () => {
  return (
    <Typography variant='body2' color='text.secondary'>
      Email: bao.oi.dn@gmail.com
    </Typography>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      sx={{
        px: 3,
        py: 5,
        bgcolor: 'background.paper',
        boxShadow: 1,
        display: 'flex',
        fontSize: '0.875rem' /* Example font size */,
        fontFamily: 'Roboto, sans-serif' /* Example font stack */,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant='body2' color='text.secondary'>
          &copy; {currentYear} BaoOi. All Rights Reserved.
          <Link
            href='https://www.facebook.com/bao.oi.danang.vn'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconButton>
              <FacebookIcon fontSize='small' color='primary.main' />
            </IconButton>
          </Link>
          <Link
            href='https://www.instagram.com/bao.oi.dn/?img_index=1'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconButton>
              <InstagramIcon fontSize='small' color='primary.main' />
            </IconButton>
          </Link>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Address />
        <Contact />
        <Email />
      </Box>
    </footer>
  );
};

export default Footer;
