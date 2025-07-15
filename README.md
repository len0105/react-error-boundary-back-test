# react-error-boundary-back-test

<https://github.com/dwango-zane/cms-frontend/pull/2195>

ミニマムで試したErrorBoundaryのエラー時にブラウザの戻るボタンを2回押さないとエラー画面から遷移しない問題

```sh
npm ci
npm run dev
```

## 再現方法

1. `npm run dev` して <http://localhost:5173/> を開く
2. <http://localhost:5173/about> にいくと通常のページが表示される
3. <http://localhost:5173/error> にいくとErrorが発生し、ErrorBoundaryにてfallbackされたエラーページが表示される
4. ブラウザの戻るボタンを1回押すと、URLは変わるがページが切り替わらない
5. ブラウザの戻るボタンを2回押すと、ページが切り替わる
