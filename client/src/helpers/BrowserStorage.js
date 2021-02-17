const STATE_KEY_PREFIX = `@@bonsai|`;

export function read(storageType, key) {
  const storage = getStorage(storageType);

  if (storage) {
    const value = storage.getItem(`${STATE_KEY_PREFIX}${key}`);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
}

export function save(storageType, key, value) {
  const storage = getStorage(storageType);

  if (storage) {
    storage.setItem(
      `${STATE_KEY_PREFIX}${key}`,
      typeof value !== "string" ? JSON.stringify(value) : value
    );
  }
}

export function remove(storageType, key) {
  const storage = getStorage(storageType);

  if (storage) {
    storage.removeItem(`${STATE_KEY_PREFIX}${key}`);
  }
}

function getStorage(type) {
  if (typeof window !== undefined) {
    switch (type) {
      case "local":
        return window.localStorage;
      case "session":
        return window.sessionStorage;
      default:
    }
  }
}
