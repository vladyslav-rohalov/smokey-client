import Link from 'next/link';
import Image from 'next/image';
import { Box, Typography, IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function CardSwiper({
  promotion,
  images,
  handleFavorite,
  isFavorite,
  swiperRef
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 'calc(100% - 16px)',
        height: 200,
        m: 1,
      }}
    >
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        effect={'fade'}
        slidesPerView={1}
        ref={swiperRef}
        direction="vertical"
        enabled={false}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        style={{
          width: 'calc(100% - 16px)',
          height: 200,
          '--swiper-pagination-color': '#f68e5f',
          '--swiper-pagination-bullet-inactive-color': '#999999',
          '--swiper-pagination-bullet-inactive-opacity': '1',
          '--swiper-pagination-bullet-size': '12px',
          '--swiper-pagination-bullet-vertical-gap': '8px',
          '--swiper-pagination-right': '18px',
        }}
      >
        {promotion && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 0,
              zIndex: 2,
              bgcolor: 'primary.hot',
              borderRadius: 2,
              color: '#fff',
            }}
          >
            <Typography sx={{ p: 0.5 }}>{promotion}</Typography>
          </Box>
        )}
        <IconButton
          sx={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}
          onClick={handleFavorite}
        >
          {isFavorite ? (
            <FavoriteOutlinedIcon
              sx={{ color: 'primary.accent', fontSize: 30 }}
            />
          ) : (
            <FavoriteBorderOutlinedIcon
              sx={{ fontSize: 30, color: 'primary.accent' }}
            />
          )}
        </IconButton>
        {images.map(image => {
          return (
            <SwiperSlide key={image}>
              <Link
                href="/"
                style={{
                  position: 'relative',
                  display: 'flex',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Image
                  className="scaleImage"
                  style={{ transition: 'transform 500ms ease-in-out' }}
                  src={image}
                  fill={true}
                  alt="image"
                  sizes="100%"
                  priority="false"
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}