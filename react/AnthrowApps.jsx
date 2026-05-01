// =============================================================
// アンソロウ React実装版 v0.1
// 3 APP（UserView / Marketplace / Dashboard）のコンポーネント
// 設計トークン: design-system/tokens.css と同一値を CSS-in-JS で表現
// =============================================================
import React, { useState, useMemo } from 'react';

// ---------- デザイントークン（tokens.cssと同じ値） ----------
const T = {
  紙基調: '#FAF9F7', 紙純白: '#FFFFFF', 紙くすみ: '#F2EFEA', 紙淡墨: '#E8E4DC',
  墨本体: '#1F1E1D', 墨中: '#44423D', 墨淡: '#6B6863', 墨極淡: '#9A968F',
  珊瑚: '#CC785C', 珊瑚濃: '#B86347', 珊瑚淡: '#F4E4DC', 珊瑚極淡: '#FAF1EC',
  成功: '#4A7C59', 成功淡: '#E8F0EA',
  警告: '#C99A2E', 警告淡: '#FAF1DC',
  危険: '#B23A3A', 危険淡: '#F8E4E4',
  書見出し: "'Tiempos Headline','Copernicus','Noto Serif JP',serif",
  書本文: "'Styrene B','Inter','Noto Sans JP',-apple-system,sans-serif",
  書数字: "'JetBrains Mono','SF Mono',monospace",
};

// ---------- 共通: スターアイコン ----------
export const アンソロウ印 = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor"
       style={{ color: T.珊瑚 }}>
    <g transform="translate(32 32)">
      {[0, 45, 90, 135].map(deg => (
        <g key={`major-${deg}`} transform={`rotate(${deg})`}>
          <rect x={-2} y={-30} width={4} height={22} rx={2}/>
        </g>
      ))}
      {[22.5, 67.5, 112.5, 157.5].map(deg => (
        <g key={`minor-${deg}`} transform={`rotate(${deg})`}>
          <rect x={-1.5} y={-26} width={3} height={18} rx={1.5}/>
        </g>
      ))}
    </g>
  </svg>
);

// ---------- 共通: ボタン ----------
const Btn = ({ variant = '線', size = 'md', children, ...rest }) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: size === 'sm' ? '6px 12px' : '10px 18px',
    fontSize: size === 'sm' ? 12 : 14, fontWeight: 500,
    borderRadius: 12, cursor: 'pointer',
    fontFamily: T.書本文, transition: 'all 180ms', border: '1px solid transparent',
  };
  const styles = {
    主要:     { background: T.墨本体, color: T.紙純白 },
    アクセント: { background: T.珊瑚, color: T.紙純白 },
    線:       { background: 'transparent', color: T.墨本体, borderColor: T.紙淡墨 },
  };
  return <button style={{ ...base, ...styles[variant] }} {...rest}>{children}</button>;
};

// ---------- 共通: タグ ----------
const Tag = ({ tone = '珊瑚', children }) => {
  const palette = {
    珊瑚: { bg: T.珊瑚淡, fg: T.珊瑚濃 },
    成功: { bg: T.成功淡, fg: T.成功 },
    警告: { bg: T.警告淡, fg: T.警告 },
    危険: { bg: T.危険淡, fg: T.危険 },
  }[tone];
  return <span style={{
    display: 'inline-flex', padding: '4px 10px',
    fontSize: 12, fontWeight: 500, borderRadius: 9999,
    background: palette.bg, color: palette.fg,
  }}>{children}</span>;
};

// ---------- 共通: サイドバー ----------
const Side = ({ active, onChange }) => {
  const items = [
    { key: '対話', label: '対話' },
    { key: '顧客', label: '顧客' },
    { key: '案件', label: '案件' },
    { key: '承認', label: '承認' },
    { key: 'マーケット', label: 'マーケットプレス' },
    { key: 'ダッシュ', label: 'ダッシュボード' },
  ];
  return (
    <aside style={{
      width: 256, background: T.紙基調, borderRight: `1px solid ${T.紙淡墨}`,
      padding: 24, flexShrink: 0, fontFamily: T.書本文,
    }}>
      <div style={{ fontFamily: T.書見出し, fontSize: 28, marginBottom: 32, letterSpacing: '-0.02em' }}>
        アンソロウ
      </div>
      {items.map(item => (
        <div key={item.key}
          onClick={() => onChange?.(item.key)}
          style={{
            padding: '10px 12px', borderRadius: 12, cursor: 'pointer',
            fontSize: 14, marginBottom: 2,
            background: active === item.key ? T.珊瑚極淡 : 'transparent',
            color: active === item.key ? T.珊瑚濃 : T.墨中,
            fontWeight: active === item.key ? 500 : 400,
          }}>
          {item.label}
        </div>
      ))}
    </aside>
  );
};

// =============================================================
// UserView APP — ホーム（対話入口）
// =============================================================
export const UserViewHome = () => {
  const [入力, set入力] = useState('');
  const 候補 = [
    '明日の山田様アポ資料を3本作成',
    '中野駅徒歩7分以内の新着物件',
    '承認待ち稟議を確認',
    '今月の見込み顧客を整理',
  ];
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: T.書本文 }}>
      <Side active="対話" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.紙純白 }}>
        <div style={{ height: 56, borderBottom: `1px solid ${T.紙淡墨}`, display: 'flex',
          alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: T.書見出し, fontSize: 18 }}>アンソロウ 4.7 ▾</div>
            <div style={{ fontSize: 12, color: T.墨淡 }}>アダプティブ</div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
          <アンソロウ印 size={56} />
          <h1 style={{ fontFamily: T.書見出し, fontSize: 28, marginTop: 16, textAlign: 'center', maxWidth: 560 }}>
            おはようございます、樋口さん。<br/>本日はどの業務から始めましょうか。
          </h1>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {候補.map(c => (
              <div key={c} onClick={() => set入力(c)} style={{
                padding: '10px 18px', background: T.紙基調, border: `1px solid ${T.紙淡墨}`,
                borderRadius: 9999, fontSize: 14, color: T.墨中, cursor: 'pointer',
              }}>{c}</div>
            ))}
          </div>
        </div>
        <div style={{ padding: '0 24px 32px', maxWidth: 720, width: '100%', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12,
            background: T.紙純白, border: `1px solid ${T.紙淡墨}`, borderRadius: 16,
            padding: '12px 16px', boxShadow: '0 2px 6px rgba(31,30,29,0.06)' }}>
            <input value={入力} onChange={e => set入力(e.target.value)}
              placeholder="アンソロウとチャット"
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 16, fontFamily: T.書本文 }}/>
            <div style={{ width: 32, height: 32, borderRadius: 9999, background: T.墨本体, color: T.紙純白,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>↑</div>
          </div>
        </div>
      </main>
    </div>
  );
};

// =============================================================
// Marketplace APP — 物件カードグリッド
// =============================================================
const 物件データ = [
  { id: 1, 題: '中野ザ・タワー', 場: 'JR中野駅 徒歩5分', 値: 48000000, 間: '3LDK', 面: 78.4, 築: 6, 推: 'AI推薦 #1' },
  { id: 2, 題: 'パークタワー中野', 場: '新中野駅 徒歩6分', 値: 46500000, 間: '3LDK', 面: 72.1, 築: 4, 推: 'AI推薦 #2' },
  { id: 3, 題: 'ザ・パームス杉並', 場: '高円寺駅 徒歩7分', 値: 45800000, 間: '3LDK', 面: 74.8, 築: 5, 推: 'AI推薦 #3' },
];

export const MarketplaceList = () => {
  const 円 = (n) => '¥' + n.toLocaleString();
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: T.書本文 }}>
      <Side active="マーケット" />
      <main style={{ flex: 1, padding: '32px 48px' }}>
        <h1 style={{ fontFamily: T.書見出し, fontSize: 36, marginBottom: 4 }}>マーケットプレス</h1>
        <div style={{ color: T.墨淡, fontSize: 14, marginBottom: 32 }}>
          提携 4,820 物件 — 山田太郎様の条件で並び替え中
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
        }}>
          {物件データ.map(物 => (
            <div key={物.id} style={{
              background: T.紙純白, border: `1px solid ${T.紙淡墨}`, borderRadius: 16,
              overflow: 'hidden', cursor: 'pointer', transition: 'all 180ms',
            }}>
              <div style={{
                aspectRatio: '16/10', background: T.紙くすみ, position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: T.墨極淡, fontFamily: T.書見出し, fontSize: 18,
              }}>
                {物.題}
                <div style={{
                  position: 'absolute', top: 12, left: 12, background: T.珊瑚, color: T.紙純白,
                  padding: '4px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 500,
                }}>{物.推}</div>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontFamily: T.書見出し, fontSize: 18, marginBottom: 4 }}>{物.題}</div>
                <div style={{ color: T.墨淡, fontSize: 12, marginBottom: 12 }}>{物.場}</div>
                <div style={{ fontFamily: T.書数字, fontSize: 22, fontWeight: 500 }}>{円(物.値)}</div>
                <div style={{ display: 'flex', gap: 12, marginTop: 12, paddingTop: 12,
                  borderTop: `1px solid ${T.紙くすみ}`, fontSize: 12, color: T.墨中 }}>
                  <span>{物.間}</span><span>・</span><span>{物.面}㎡</span><span>・</span><span>築{物.築}年</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// =============================================================
// Dashboard APP — KPIサマリー
// =============================================================
const KPIs = [
  { 名: '月次成約金額', 値: '¥482M', 差: '+12.4%', 上: true },
  { 名: '成約件数', 値: '14件', 差: '+2件', 上: true },
  { 名: '粗利率', 値: '19.2%', 差: '+0.8pt', 上: true },
  { 名: '稟議所要時間', 値: '4.2h', 差: '-0.6h', 上: false },
];

export const DashboardKPI = () => (
  <div style={{ display: 'flex', minHeight: '100vh', fontFamily: T.書本文 }}>
    <Side active="ダッシュ" />
    <main style={{ flex: 1, padding: '32px 48px' }}>
      <h1 style={{ fontFamily: T.書見出し, fontSize: 36, marginBottom: 4 }}>KPIサマリー</h1>
      <div style={{ color: T.墨淡, fontSize: 14, marginBottom: 32 }}>
        2026年4月 ・ 中野支店 ・ 全担当 12名
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {KPIs.map(k => (
          <div key={k.名} style={{
            background: T.紙純白, border: `1px solid ${T.紙淡墨}`, borderRadius: 16, padding: 24,
          }}>
            <div style={{ fontSize: 12, color: T.墨淡, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {k.名}
            </div>
            <div style={{ fontFamily: T.書数字, fontSize: 36, fontWeight: 500, marginTop: 8 }}>
              {k.値}
            </div>
            <div style={{
              display: 'inline-flex', marginTop: 8, padding: '4px 10px', borderRadius: 9999,
              background: k.上 ? T.成功淡 : T.成功淡, color: T.成功, fontSize: 12, fontWeight: 500,
            }}>
              {k.上 ? '↑' : '↓'} {k.差} 前月比
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: T.紙純白, border: `1px solid ${T.紙淡墨}`,
        borderRadius: 16, padding: 24 }}>
        <div style={{ fontFamily: T.書見出し, fontSize: 22, marginBottom: 16 }}>
          アンソロウAI 月次洞察
        </div>
        <ul style={{ paddingLeft: 20, color: T.墨中, lineHeight: 1.8, fontSize: 14 }}>
          <li><strong>中野エリア3LDK需要</strong>が前月比+18%。仕入れ強化を推奨。</li>
          <li><strong>AI推薦経由成約率</strong>42%（業界平均24%）。主要成約経路化。</li>
          <li><strong>樋口担当の予測精度</strong>88%到達。学区情報強調が寄与。</li>
        </ul>
      </div>
    </main>
  </div>
);

// =============================================================
// メインデモ画面（デフォルトエクスポート）
// =============================================================
const アプリ一覧 = [
  { key: 'uv', label: 'UserView ホーム', Comp: UserViewHome },
  { key: 'mp', label: 'Marketplace 一覧', Comp: MarketplaceList },
  { key: 'db', label: 'Dashboard KPI', Comp: DashboardKPI },
];

export default function AnthrowDemo() {
  const [現在, set現在] = useState('uv');
  const Comp = useMemo(() => アプリ一覧.find(a => a.key === 現在).Comp, [現在]);
  return (
    <div style={{ background: T.紙基調, minHeight: '100vh' }}>
      <div style={{
        position: 'fixed', top: 16, right: 16, zIndex: 100,
        display: 'flex', gap: 8,
        background: T.紙純白, padding: 4, borderRadius: 9999, border: `1px solid ${T.紙淡墨}`,
      }}>
        {アプリ一覧.map(a => (
          <button key={a.key}
            onClick={() => set現在(a.key)}
            style={{
              padding: '6px 14px', borderRadius: 9999, border: 'none', cursor: 'pointer',
              fontSize: 12, fontFamily: T.書本文,
              background: 現在 === a.key ? T.墨本体 : 'transparent',
              color: 現在 === a.key ? T.紙純白 : T.墨中,
            }}>{a.label}</button>
        ))}
      </div>
      <Comp />
    </div>
  );
}
