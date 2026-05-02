import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function useSystemTheme() {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const [dark, setDark] = useState(mq.matches);
  useEffect(() => {
    const handler = (e) => setDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return dark;
}

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dark = useSystemTheme();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [viewerFoodPartnerId, setViewerFoodPartnerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Missing food partner id.");
      setLoading(false);
      return;
    }

    setLoading(true);

    Promise.allSettled([
      axios.get(`http://localhost:3000/api/foodPartner/${id}`, {
        withCredentials: true,
      }),
      axios.get("http://localhost:3000/api/foodPartner/me", {
        withCredentials: true,
      }),
    ])
      .then(([profileResult, viewerResult]) => {
        if (profileResult.status === "rejected") {
          const err = profileResult.reason;
          const message =
            err.response?.status === 401
              ? "Please login before opening this profile."
              : err.response?.status === 404
              ? "Food partner not found."
              : "We could not load this profile right now.";

          setError(message);
          return;
        }

        setProfile(profileResult.value.data.foodPartner);
        setPosts(profileResult.value.data.foodItemsByFoodPartner);
        setError("");

        if (viewerResult.status === "fulfilled") {
          setViewerFoodPartnerId(viewerResult.value.data.foodPartner?._id ?? null);
        } else {
          setViewerFoodPartnerId(null);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const canCreateFood = viewerFoodPartnerId === id;

  const t = dark
    ? {
        pageBg: "#09090b",
        cardBg: "#111113",
        cardBorder: "#27272a",
        pillBg: "#1c1c1f",
        pillBorder: "#3f3f46",
        accent: "#f87171",
        accentSoft: "#1f1212",
        accentMid: "#7f1d1d33",
        textPrimary: "#fafafa",
        textSecondary: "#a1a1aa",
        textMuted: "#52525b",
        badgeBg: "#1f1212",
        badgeText: "#f87171",
        statLabel: "#71717a",
        shadow: "0 32px 80px rgba(0,0,0,.6)",
      }
    : {
        pageBg: "#f9fafb",
        cardBg: "#ffffff",
        cardBorder: "#fee2e2",
        pillBg: "#fff7f7",
        pillBorder: "#fecaca",
        accent: "#f87171",
        accentSoft: "#fef2f2",
        accentMid: "#fee2e2",
        textPrimary: "#111827",
        textSecondary: "#374151",
        textMuted: "#9ca3af",
        badgeBg: "#fee2e2",
        badgeText: "#ef4444",
        statLabel: "#6b7280",
        shadow: "0 24px 60px rgba(239,68,68,.10)",
      };

  if (loading) {
    return (
      <div style={centerWrap(t)}>
        <Spinner accent={t.accent} />
        <p style={{ color: t.textSecondary, marginTop: 16, fontSize: 14 }}>
          Loading profile…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={centerWrap(t)}>
        <div
          style={{
            background: t.cardBg,
            border: `1px solid ${t.cardBorder}`,
            borderRadius: "1.5rem",
            padding: "2rem",
            maxWidth: 320,
            textAlign: "center",
            boxShadow: t.shadow,
          }}
        >
          <span style={{ fontSize: 36 }}>🍽️</span>
          <p style={{ color: t.textPrimary, fontWeight: 600, marginTop: 12 }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={centerWrap(t)}>
        <p style={{ color: t.textSecondary }}>Profile not found.</p>
      </div>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: t.pageBg,
        padding: "20px 16px 40px",
        fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
        transition: "background .3s",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .fp-video-item { overflow: hidden; }
        .fp-video-item video { transition: transform .4s ease; display: block; }
        .fp-video-item:hover video { transform: scale(1.06); }
      `}</style>

      {/* ── PROFILE CARD ── */}
      <div
        style={{
          maxWidth: 420,
          margin: "0 auto",
          background: t.cardBg,
          border: `1px solid ${t.cardBorder}`,
          borderRadius: "2rem",
          overflow: "hidden",
          boxShadow: t.shadow,
        }}
      >
        <section style={{ padding: "24px 20px 20px" }}>

          {/* Avatar + name */}
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
            <div
              style={{
                flexShrink: 0,
                width: 76,
                height: 76,
                borderRadius: "50%",
                overflow: "hidden",
                border: `3px solid ${t.accentMid}`,
                background: t.accentSoft,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=200&q=80"
                alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ minWidth: 0 }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  borderRadius: 6,
                  padding: "3px 9px",
                  background: t.badgeBg,
                  color: t.badgeText,
                  marginBottom: 5,
                }}
              >
                Partner
              </span>
              <p
                style={{
                  color: t.textPrimary,
                  fontWeight: 700,
                  fontSize: 19,
                  lineHeight: 1.25,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {profile?.name}
              </p>
            </div>
          </div>

          {canCreateFood && (
            <button
              type="button"
              onClick={() => navigate("/createFood")}
              style={{
                width: "100%",
                border: "none",
                borderRadius: "0.95rem",
                padding: "13px 16px",
                marginBottom: 12,
                background: t.accent,
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 10px 24px rgba(248,113,113,.22)",
              }}
            >
              Create Food
            </button>
          )}

          {/* Address pill */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              background: t.pillBg,
              border: `1px solid ${t.pillBorder}`,
              borderRadius: "0.875rem",
              padding: "10px 14px",
              marginBottom: 8,
            }}
          >
            <LocationIcon color={t.accent} />
            <p
              style={{
                color: t.textSecondary,
                fontSize: 13,
                lineHeight: 1.55,
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              {profile?.address}
            </p>
          </div>

          {/* Phone pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: t.pillBg,
              border: `1px solid ${t.pillBorder}`,
              borderRadius: "0.875rem",
              padding: "10px 14px",
            }}
          >
            <PhoneIcon color={t.accent} />
            <p style={{ color: t.textSecondary, fontSize: 13 }}>
              {profile?.phone}
            </p>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginTop: 14,
            }}
          >
            <StatCard label="Total Meals" value={posts.length} t={t} />
            <StatCard label="Customers Served" value="15K" t={t} />
          </div>
        </section>
      </div>

      {/* ── VIDEO GRID — separate from card ── */}
      {posts.length > 0 && (
        <div
          style={{
            maxWidth: 420,
            margin: "10px auto 0",
            borderRadius: "2rem",
            overflow: "hidden",
          }}
        >
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              background: t.pageBg, /* matches page — empty cells vanish */
            }}
          >
            {posts.map((item) => (
              <article
                key={item._id}
                className="fp-video-item"
                style={{
                  position: "relative",
                  aspectRatio: "3 / 4",
                  background: t.pillBg,
                  borderRadius: 4,
                }}
              >
                <video
                  src={item.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                {item.name && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "20px 6px 6px",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 100%)",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#fff",
                      letterSpacing: ".02em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </div>
                )}
              </article>
            ))}
          </section>
        </div>
      )}
    </main>
  );
};

function StatCard({ label, value, t }) {
  return (
    <div
      style={{
        background: t.accentSoft,
        border: `1px solid ${t.accentMid}`,
        borderRadius: "0.875rem",
        padding: "12px 16px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: t.statLabel,
          textTransform: "uppercase",
          letterSpacing: ".07em",
          marginBottom: 4,
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: 26, fontWeight: 700, color: t.accent }}>
        {value}
      </p>
    </div>
  );
}

function Spinner({ accent }) {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: `3px solid ${accent}22`,
        borderTopColor: accent,
        animation: "spin .8s linear infinite",
      }}
    />
  );
}

function LocationIcon({ color }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon({ color }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.01 2.84 2 2 0 012 .67h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.47a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function centerWrap(t) {
  return {
    minHeight: "100vh",
    background: t.pageBg,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
  };
}

export default Profile;
