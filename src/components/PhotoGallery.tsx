'use client';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

interface Props {
  images: string[];
}

export default function PhotoGallery({ images }: Props) {
  if (images.length === 0) return null;

  // Duplicate images for seamless infinite scroll
  const allImages = [...images, ...images];

  return (
    <div className="overflow-hidden mb-8 -mx-4 md:mx-0">
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `gallery-scroll ${images.length * 6}s linear infinite`,
        }}
      >
        {allImages.map((img, i) => (
          <div
            key={`${img}-${i}`}
            className="w-[260px] md:w-[320px] h-[160px] md:h-[200px] flex-shrink-0 rounded-xl overflow-hidden"
          >
            <img
              src={`${basePath}/images/${img}`}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
