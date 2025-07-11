import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity, // 業務データをキャッシュして表示するべきではないため、キャッシュをしない
      refetchOnWindowFocus: false, // ウィンドウフォーカス時にリフェッチしない
      refetchOnReconnect: false, // 再接続時にリフェッチしない
      retry: false // エラー時にリトライしない
    }
  }
});
