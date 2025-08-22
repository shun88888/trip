# 旅のしおりサイト作成用 AIプロンプト

以下のプロンプトをAIに入力して、同じような旅のしおりサイトを作成してください。

---

## プロンプト

```
React + TypeScript + Vite + Tailwind CSS + shadcn/uiを使って、旅のしおりWebサイトを作成してください。

## 要件

### 技術スタック
- React 18 + TypeScript
- Vite (ビルドツール)
- Tailwind CSS (スタイリング)
- shadcn/ui (UIコンポーネント)
- Lucide React (アイコン)

### サイト構造
1. **ヘッダー**
   - 山のアイコン
   - 旅のタイトル（後で指定）
   
2. **各日程のカード**
   - Day N: [日程タイトル]
   - Google Maps埋め込みルートマップ
   - 時系列のスケジュール表示

3. **費用概算カード**
   - 項目別の費用内訳
   - 合計金額

4. **旅のポイントカード**
   - 重要なメモやヒント

### デザイン要件
- **シンプルでクリーンなデザイン**
- **shadcn/uiのスタイルに準拠**
- **レスポンシブ対応**（スマホ・タブレット・PC）
- **時間・アイコン・本文が中央揃えで整列**

### スケジュール表示の詳細仕様
```typescript
// タイムラインアイテムの構造
<div className="flex items-start gap-3 pb-4">
  {/* 時間バッジ - 固定幅 */}
  <div className="flex flex-col items-center flex-shrink-0">
    <div className="h-8 w-16 flex items-center justify-center">
      <Badge variant="outline" className="h-6 w-full text-xs font-mono flex items-center justify-center">
        {時間}
      </Badge>
    </div>
    {最後でない場合 && <div className="w-0.5 h-6 bg-border mt-2" />}
  </div>
  
  {/* アイコン - 固定サイズ */}
  <div className="flex-shrink-0">
    <div className="p-1.5 border rounded-md w-8 h-8 flex items-center justify-center">
      <Icon size={16} className="text-muted-foreground" />
    </div>
  </div>
  
  {/* 内容 - 可変幅 */}
  <div className="flex items-center justify-between flex-1 min-w-0 h-8">
    <span className="text-sm leading-relaxed pr-2">{内容}</span>
    {URLがある場合 && <ExternalLinkアイコン />}
  </div>
</div>
```

### Google Maps統合
- 各日程にルートマップを表示
- Google Maps Embed APIを使用
- 環境変数でAPIキーを管理
- directions APIでwaypointsを指定してルート表示

### ファイル構成
```
src/
├── App.tsx (メインコンポーネント)
├── index.css (Tailwind + shadcn/ui CSS)
├── main.tsx
├── components/ui/ (shadcn/uiコンポーネント)
├── lib/utils.ts (shadcn/uiユーティリティ)
package.json
vite.config.ts
tailwind.config.js
tsconfig.json
.env (Google Maps API Key)
```

## 作成手順

1. **プロジェクト初期化**
   ```bash
   npm create vite@latest [プロジェクト名] --template react-ts
   cd [プロジェクト名]
   npm install
   ```

2. **依存関係追加**
   ```bash
   npm install tailwindcss autoprefixer postcss lucide-react
   npm install --save-dev @types/node
   ```

3. **shadcn/ui初期化**
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add card badge
   ```

4. **必要なファイルを作成**
   - tsconfig.jsonにpathsエイリアス設定
   - vite.config.tsにpath resolve設定
   - Tailwind設定
   - shadcn/ui CSS変数

5. **データ構造**
   ```typescript
   interface ScheduleItem {
     time: string;
     event: string;
     icon: React.ComponentType;
     url?: string;
   }

   interface DayData {
     day: number;
     title: string;
     icon: React.ComponentType;
     mapUrl: string;
     schedule: ScheduleItem[];
   }

   interface TripData {
     title: string;
     days: DayData[];
     budget: { title: string; items: BudgetItem[]; total: string; };
     notes: { title: string; items: string[]; };
   }
   ```

## 入力データ指定

作成後、以下の情報を入力して旅のしおりをカスタマイズしてください：

**旅のタイトル**: [ここに旅のタイトルを入力]

**日程データ**:
- 1日目: [タイトル], [出発地], [目的地], [経由地1|経由地2|...]
- 2日目: [タイトル], [出発地], [目的地], [経由地1|経由地2|...]

**各日のスケジュール**:
```
時間 | 内容 | アイコン種類 | URL(オプション)
09:00 | 出発 | Car | 
10:30 | 観光地A | Mountain | https://example.com
...
```

**費用概算**:
```
項目 | 金額
交通費 | 10,000円
宿泊費 | 8,000円
...
```

**旅のポイント**:
```
- ポイント1
- ポイント2
...
```

**Google Maps API Key**: [APIキーを.envに設定]

この仕様で、全く同じデザイン・機能の旅のしおりサイトを作成してください。
```

---

## 使用方法

1. 上記プロンプトをAIチャットにコピー&ペースト
2. 旅のタイトル、日程、スケジュール、費用などの具体的データを追加指定
3. Google Maps API Keyを取得して設定
4. 生成されたコードを確認・調整

## 注意事項

- Google Maps API Keyは環境変数で管理
- HTTPリファラー制限を設定推奨
- .envファイルをGitignoreに追加
- 本番環境では適切な環境変数設定が必要