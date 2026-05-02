import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const overlayDescriptionStyle = {
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
};

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="26"
    height="26"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SavedIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

function ReelFeed({ foodItems, onLike, onSave }) {
  const videoRefs = useRef([]);

  useEffect(() => {
    if (!foodItems.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (!(video instanceof HTMLVideoElement)) {
            return;
          }

          if (entry.isIntersecting) {
            video.play().catch(() => {
              video.muted = true;
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [foodItems]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black">
      <main className="flex-1 overflow-y-auto snap-y snap-mandatory bg-black [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {foodItems.map((foodItem, index) => {
          const partnerId =
            typeof foodItem.foodPartner === "object"
              ? foodItem.foodPartner?._id
              : foodItem.foodPartner;

          return (
            <section
              key={foodItem._id ?? index}
              className="relative flex h-[calc(100vh-4rem)] snap-start snap-always items-center justify-center overflow-hidden bg-neutral-950 px-4 py-3 lg:px-8"
            >
              <div className="flex h-full w-full max-w-7xl items-center justify-center gap-6 lg:-translate-x-12 xl:-translate-x-16 xl:gap-10">
                <div className="hidden lg:flex lg:w-[280px] xl:w-[340px] lg:justify-end">
                  <div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white backdrop-blur-md">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/65">
                      {foodItem.name || "Featured Store"}
                    </p>

                    <p
                      className="mb-5 text-sm leading-6 text-white/90"
                      style={overlayDescriptionStyle}
                    >
                      {foodItem.description ||
                        "Freshly uploaded food reel from one of our partners."}
                    </p>

                    {partnerId ? (
                      <Link to={`/foodPartner/${partnerId}`}>
                        <button
                          type="button"
                          className="inline-flex min-w-40 items-center justify-center rounded-full  bg-red-400 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-red-400/90"
                        >
                          Visit Store
                        </button>
                      </Link>
                    ) : null}
                  </div>
                </div>

                <div className="relative h-full w-full overflow-hidden bg-black lg:w-[360px] lg:shrink-0 xl:w-[400px]">
                  <video
                    ref={(element) => {
                      videoRefs.current[index] = element;
                    }}
                    className="h-full w-full object-cover"
                    src={foodItem.video}
                    muted
                    loop
                    playsInline
                    autoPlay={index === 0}
                    preload="metadata"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/80 lg:bg-linear-to-t lg:from-black/70 lg:via-transparent lg:to-transparent" />

                  <div className="absolute right-4 bottom-28 z-20 flex flex-col items-center gap-5 lg:hidden">
                    <button
                      type="button"
                      onClick={() => onLike(foodItem)}
                      className="flex flex-col items-center gap-1 text-white drop-shadow-lg transition-transform active:scale-90"
                      aria-label="Like"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
                        <HeartIcon />
                      </div>
                      <span className="text-xs font-semibold tabular-nums drop-shadow">
                        {foodItem.likesCount ?? 0}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSave(foodItem)}
                      className="flex flex-col items-center gap-1 text-white drop-shadow-lg transition-transform active:scale-90"
                      aria-label="Bookmark"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
                        <BookmarkIcon />
                      </div>
                      <span className="text-xs font-semibold tabular-nums drop-shadow">
                        {foodItem.savedCount ?? 0}
                      </span>
                    </button>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 lg:hidden">
                    <div className="max-w-md">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/65">
                        {foodItem.name || "Featured Store"}
                      </p>

                      <p
                        className="mb-4 text-sm leading-6 text-white/90 sm:text-base"
                        style={overlayDescriptionStyle}
                      >
                        {foodItem.description ||
                          "Freshly uploaded food reel from one of our partners."}
                      </p>

                      {partnerId ? (
                        <Link to={`/foodPartner/${partnerId}`}>
                          <button
                            type="button"
                            className="pointer-events-auto inline-flex min-w-40 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
                          >
                            Visit Store
                          </button>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex lg:w-[120px] lg:shrink-0 lg:justify-start">
                  <div className="flex flex-col items-center gap-6 text-white">
                    <button
                      type="button"
                      onClick={() => onLike(foodItem)}
                      className="flex flex-col items-center gap-2 drop-shadow-lg transition-transform active:scale-90"
                      aria-label="Like"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                        <HeartIcon />
                      </div>
                      <span className="text-sm font-semibold tabular-nums">
                        {foodItem.likesCount ?? 0}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSave(foodItem)}
                      className="flex flex-col items-center gap-2 drop-shadow-lg transition-transform active:scale-90"
                      aria-label="Bookmark"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                        <BookmarkIcon />
                      </div>
                      <span className="text-sm font-semibold tabular-nums">
                        {foodItem.savedCount ?? 0}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      <nav className="z-30 flex h-16 items-center justify-around border-t border-white/10 bg-black/30 px-8 backdrop-blur-md">
      <Link to={"/"}>
        <button
          type="button"
          aria-label="Home"
          className="flex flex-col items-center text-white transition-opacity hover:opacity-70"
        >
          <HomeIcon />
        </button>
      </Link>

<Link to={"/user/saved"}>
        <button
          type="button"
          aria-label="Saved"
          className="flex flex-col items-center text-white transition-opacity hover:opacity-70"
        >
          <SavedIcon />
        </button>
</Link>
      </nav>
    </div>
  );
}

export default ReelFeed;
