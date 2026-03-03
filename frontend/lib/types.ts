export interface Post {
  id: number;
  youtube_url: string;
  draft: string;
  published: boolean;
  created_at: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface UserProfile {
  id: number;
  email: string;
  plan: string;
  posts_used: number;
  posts_limit: number;
  created_at: string;
}

export interface UserPreferences {
  tone: string;
  post_length: string;
  hashtags: string;
}
