const API_URL = "http://localhost:8000";

// 🔐 Login
export async function loginUser(email: string, password: string) {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Login failed");
  }

  return data;
}

// 📝 Register
export async function registerUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Registration failed");
  }

  return data;
}

// 🚀 Generate Post
export async function generatePost(youtubeUrl: string) {
  const res = await fetch(`${API_URL}/generate`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ youtube_url: youtubeUrl }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to generate post");
  }

  return data;
}

// 📤 Publish Post
export async function publishPost(id: number) {
  const res = await fetch(`${API_URL}/publish`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to publish");
  }

  return data;
}

// 🔗 LinkedIn Status
export async function getLinkedInStatus() {
  const res = await fetch(`${API_URL}/auth/linkedin/status`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to fetch LinkedIn status");
  }

  return data;
}

// 🚪 Logout
export async function logoutUser() {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return res.json();
}

// ─── User Profile ───

export async function getUserProfile() {
  const res = await fetch(`${API_URL}/user/me`, {
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to fetch profile");
  return data;
}

// ─── User Preferences ───

export async function getUserPreferences() {
  const res = await fetch(`${API_URL}/user/preferences`, {
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to fetch preferences");
  return data;
}

export async function updateUserPreferences(prefs: {
  tone?: string;
  post_length?: string;
  hashtags?: string;
}) {
  const res = await fetch(`${API_URL}/user/preferences`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prefs),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to update preferences");
  return data;
}

// ─── User Posts (from DB) ───

export async function getUserPosts() {
  const res = await fetch(`${API_URL}/posts`, {
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to fetch posts");
  return data;
}

// ─── Delete Account ───

export async function deleteAccount() {
  const res = await fetch(`${API_URL}/user/account`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to delete account");
  return data;
}