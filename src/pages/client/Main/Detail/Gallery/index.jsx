import { IconButton, Dialog } from '@mui/material';
import { CarouselComp } from '../Component';
import { HighlightOff } from '@mui/icons-material';
import { useState } from 'react';

const CloseIcon = ({ close }) => {
  return (
    <IconButton
      onClick={close}
      size="large"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        color: 'white',
      }}
    >
      <HighlightOff />
    </IconButton>
  );
};

export const Gallery = ({ medias, open, initialIndex, close }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? medias.length - 1 : prevIndex - 1));
  };
  const handleNext = () => {
    setActiveIndex((nextIndex) => (nextIndex === 0 ? medias.length - 1 : nextIndex - 1));
  };
  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const galleryStyle = {
    maxWidth: 'md',
    backgroundColor: 'transparent',
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      sx={{
        '& .MuiDialog-paper': galleryStyle,
      }}
    >
      <CarouselComp
        medias={medias}
        activeIndex={activeIndex}
        prev={handlePrevious}
        next={handleNext}
        height={500}
        width={500}
        heightMedia="200px"
        otherComp={<CloseIcon close={close} />}
      />
      {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1rem',
        }}
      >
        {medias.length > 0 ? (
          medias.map((media, index) => {
            <Box
              key={index}
              onClick={() => handleClick(index)}
              sx={{
                width: '100%',
                borderRadius: '5px',
                margin: '0.2rem',
                cursor: 'pointer',
                border: index === activeIndex ? '2px solid #2C8AD3' : '#DBDBDB',
              }}
            >
              <MediaBox media={media} alter="thumbnail" index={index} height="400px" />
            </Box>;
          })
        ) : (
          <Box
            onClick={() => handleClick(0)}
            sx={{
              width: '100px',
              borderRadius: '5px',
              margin: '0.2rem',
              cursor: 'pointer',
              border: '2px solid #2C8AD3',
            }}
          >
            No Media Available
          </Box>
        )} */}
      {/* </Box> */}
    </Dialog>
  );
};
