// Tailwind play-CDN config shared by every page.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink:   { DEFAULT: '#10201D', 2: '#2A3B37' },
        muted: '#5B6A66',
        line:  '#E1E7E5',
        paper: '#F7F9F8',
        brand: { DEFAULT: '#0E5E52', 50: '#EDF5F3', 100: '#D6EAE5', 600: '#0B4F45', 700: '#093F37' },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', '"Times New Roman"', 'serif'],
        sans:  ['Inter', '"Segoe UI"', 'system-ui', 'sans-serif'],
        mono:  ['"IBM Plex Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
      borderRadius: { btn: '6px', card: '12px' },
      boxShadow: {
        soft:   '0 1px 2px rgba(16,32,29,.04), 0 6px 16px -6px rgba(16,32,29,.08)',
        raised: '0 2px 6px rgba(16,32,29,.05), 0 24px 48px -20px rgba(14,94,82,.28)',
      },
    },
  },
};
