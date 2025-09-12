const storage = {
  set: (key: string, value: any) => {
    if (typeof window === "undefined") return;

    if (!value || value.length <= 0) return;

    if (typeof value === "string") {
      return window.localStorage.setItem(key, value);
    } else {
      return window.localStorage.setItem(key, JSON.stringify(value));
    }
  },

  get: (key: string) => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key) as string;
  },

  remove: (key: string) => {
    if (typeof window === "undefined") return;
    return window.localStorage.removeItem(key);
  },

  key: (index: number | string) => {
    if (typeof window === "undefined") return null;
    return window.localStorage.key(Number(index));
  },

  length: () => {
    if (typeof window === "undefined") return 0;
    return window.localStorage.length;
  },

  clear: () => {
    if (typeof window === "undefined") return;
    return window.localStorage.clear();
  },
};

export default storage;
