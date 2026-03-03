export interface Post {
  id: number;
  youtubeUrl: string;
  draft: string;
  status: 'draft' | 'published';
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
