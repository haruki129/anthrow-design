# アンソロウ デザインベース v0.1

不動産現場最適化のための業務SaaS UI 一式。Anthropic Claude のデザイン哲学に準拠。

## 公開URL

GitHub Pages 有効化後:
`https://<your-github-id>.github.io/anthrow-design/`

## 構成

| フォルダ | 内容 |
|---|---|
| `index.html` | 13画面 + 設計ドキュメントへの一覧入口 |
| `design-system/` | デザイントークン (CSS変数) と原則ドキュメント |
| `prototypes/userview/` | 営業担当者の日常画面 (5画面) |
| `prototypes/marketplace/` | 物件・提案の生成場 (4画面) |
| `prototypes/dashboard/` | 管理・俯瞰の場 (4画面) |
| `specs/` | 各APPの仕様書 |
| `react/` | React実装版 (`AnthrowApps.jsx`) |
| `承認フロー_v0.1.md` | 変更→確認→2択→保存／改善 のフロー雛形 |

## デザイン原則

- **静かな信頼感** — 過度な装飾を排し、読みやすさを最優先
- **3版リテンション** — 変更前後の差分を必ず表示し、3版まで復元可能
- **承認フロー厳守** — 変更 → 動作確認 → 2択 → 保存／改善

## 開発・更新

`/current/` 配下が原本。`/publish/` は GitHub Pages 用にコピーしたもの。
新しいバージョンは `v0.1` → `v0.2` → `v0.3` まで履歴保持。

---
© アンソロウ デザインプロジェクト
