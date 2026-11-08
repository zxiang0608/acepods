import React from 'react';

export default function CustomerLogoStage({
  src,
  alt,
  stageClassName = 'h-[46px] w-[132px] md:h-[56px] md:w-[236px]',
  opticalWidth,
  opticalHeight,
  imageClassName = '',
  loading = 'lazy'
}) {
  const opticalStyle = {
    ...(opticalWidth ? { maxWidth: `${opticalWidth}px` } : {}),
    ...(opticalHeight ? { maxHeight: `${opticalHeight}px` } : {})
  };

  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden ${stageClassName}`}>
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-contain ${imageClassName}`}
        style={opticalStyle}
        loading={loading}
        decoding="async"
      />
    </div>
  );
}
