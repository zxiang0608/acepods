const originalImageModules = {
  ...import.meta.glob('../../assets/Portfolio/**/*.{jpg,jpeg}', {
    eager: true,
    import: 'default'
  }),
  ...import.meta.glob('../../assets/POD images/Ace Flex Duo/flexduo*.jpeg', {
    eager: true,
    import: 'default'
  }),
  ...import.meta.glob('../../assets/locations/*.{jpg,jpeg}', {
    eager: true,
    import: 'default'
  })
};

const avifImageModules = {
  ...import.meta.glob('../../assets/Portfolio/**/*.avif', {
    eager: true,
    import: 'default'
  }),
  ...import.meta.glob('../../assets/POD images/Ace Flex Duo/flexduo*.avif', {
    eager: true,
    import: 'default'
  }),
  ...import.meta.glob('../../assets/locations/*.avif', {
    eager: true,
    import: 'default'
  })
};

const galleryAvifByOriginal = new Map(
  Object.entries(originalImageModules).flatMap(([sourcePath, sourceUrl]) => {
    const avifPath = sourcePath.replace(/\.jpe?g$/i, '.avif');
    const avifUrl = avifImageModules[avifPath];
    return avifUrl ? [[sourceUrl, avifUrl]] : [];
  })
);

export const getGalleryAvifSource = (sourceUrl) => galleryAvifByOriginal.get(sourceUrl) || null;
