export const PublicRoutes = {
  LOGIN: { route: "/login" },
  REGISTER: { route: "/register" },
  HISTORY: { route: "/history" },
};

export const PrivateRoutes = {
  SETTINGS: { icon: "settings", label: "Configuración", route: "/settings" },
  PROFILE: { route: "/profile" },
  ECOGRAPHY: { route: "/ecography" },
  HISTORY: { icon: "folder", label: "Mis Ecografías", route: "/history" },
  HOME: {
    P: { icon: "folder", label: "Mis Ecografías", route: "/history" },
    D: { icon: "folder", label: "Mis Ecografías", route: "/history" },
    A: { icon: "Monitoring", label: "Analíticas", route: "/analytics" },
  },
  P: {
    SUPPORT: { icon: "help", label: "Soporte", route: "/support" },
  },
  D: {
    CREATE_ECOGRAPHY: { route: "/create" },
  },
  A: {
    REQUESTS: {
      icon: "quick_reference",
      label: "Solicitudes",
      route: "/requests",
    },
    REQUEST: { route: "/request" },
  },
};
