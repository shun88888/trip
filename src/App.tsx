import React from 'react';
import { Plane, Car, Coffee, Mountain, Bath, Hotel, UtensilsCrossed, Waves, TowerControl, Camera, Wallet, ClipboardList, ExternalLink, Clock, Map } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ScheduleItem {
  time: string;
  event: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  url?: string;
}

interface DayData {
  day: number;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  mapUrl: string;
  schedule: ScheduleItem[];
}

interface BudgetItem {
  item: string;
  cost: string;
}

interface TripData {
  title: string;
  days: DayData[];
  budget: {
    title: string;
    items: BudgetItem[];
    total: string;
  };
  notes: {
    title: string;
    items: string[];
  };
}

const tripData: TripData = {
  title: "西田の心癒しツアー",
  days: [
    {
      day: 1,
      title: "四国カルスト + 道後温泉",
      icon: Mountain,
      mapUrl: "https://www.google.com/maps/embed/v1/directions?key=AIzaSyAhYkvyTnOOrT32Ipghw4WNv9FbxKp11JU&origin=松山空港&destination=道後温泉本館&waypoints=四国カルスト|道の駅天空の郷さんさん&language=ja&region=JP",
      schedule: [
        { time: "09:00", event: "松山空港着 → レンタカー受取", icon: Plane, url: "https://www.matsuyama-airport.co.jp/" },
        { time: "09:15", event: "松山出発 → 四国カルストへ（約2.5h）", icon: Car },
        { time: "11:45", event: "道の駅 天空の郷さんさん（休憩）", icon: Coffee, url: "https://kuma-kanko.com/spot/spot2936/" },
        { time: "12:30", event: "四国カルスト（天狗高原・カルストテラス・絶景ドライブ）", icon: Mountain, url: "https://shikoku-tourism.com/feature/karusuto/top" },
        { time: "14:30", event: "下山開始（約2.5h）", icon: Car },
        { time: "17:00", event: "道後温泉本館 入浴", icon: Bath, url: "https://dogo.jp/" },
        { time: "18:30", event: "ホテルチェックイン（松山市内）", icon: Hotel },
        { time: "19:00", event: "夜ご飯：松山市内の居酒屋", icon: UtensilsCrossed },
        { time: "21:30", event: "ホテル戻り・就寝", icon: Hotel },
      ]
    },
    {
      day: 2,
      title: "しまなみ海道ドライブ",
      icon: Waves,
      mapUrl: "https://www.google.com/maps/embed/v1/directions?key=AIzaSyAhYkvyTnOOrT32Ipghw4WNv9FbxKp11JU&origin=松山市内ホテル&destination=松山空港&waypoints=下灘駅|道の駅ふたみ|来島海峡SA|亀老山展望公園&language=ja&region=JP",
      schedule: [
        { time: "09:30", event: "ホテル出発", icon: Hotel },
        { time: "10:30", event: "下灘駅（写真スポット）", icon: Camera, url: "https://www.city.iyo.lg.jp/machizukuri/kanko/guidemap/jrshimonada.html" },
        { time: "11:30", event: "道の駅ふたみ（海沿い休憩）", icon: Waves, url: "https://iyokankou.jp/spot/spot-1869/" },
        { time: "13:00", event: "来島海峡SA（大橋の絶景展望）", icon: TowerControl, url: "https://s-leading.co.jp/kurushima" },
        { time: "13:30", event: "昼食：今治グルメ（焼豚玉子飯など）", icon: UtensilsCrossed },
        { time: "14:30", event: "亀老山展望公園（しまなみ随一の絶景）", icon: Mountain, url: "https://www.iyokannet.jp/spot/191" },
        { time: "16:30", event: "今治市内カフェ or 道の駅で休憩", icon: Coffee },
        { time: "17:30", event: "松山空港へ移動（約1h）", icon: Car },
        { time: "18:30", event: "空港到着 → 軽食・休憩", icon: Coffee },
        { time: "20:00", event: "フライト", icon: Plane },
      ]
    }
  ],
  budget: {
    title: "費用概算（1人あたり）",
    items: [
      { item: "車関連", cost: "約8,800円" },
      { item: "飛行機", cost: "14,000円" },
      { item: "宿泊", cost: "5,000円" },
      { item: "食事", cost: "7,000円" },
      { item: "食べ歩き・カフェ", cost: "2,500円" },
      { item: "観光", cost: "500円" },
    ],
    total: "約36,300円／人"
  },
  notes: {
    title: "プランのポイント",
    items: [
      "朝はゆっくりチェックアウトできる",
      "2日目の観光時間はタイト（空港まで直行に近い流れ）",
      "待ち時間が減るので無駄がない",
    ]
  }
};

const TimelineItem: React.FC<{
  item: ScheduleItem;
  isLast: boolean;
}> = ({ item, isLast }) => (
  <div className="flex items-start gap-3 pb-4">
    {/* Time Badge - fixed width for consistent alignment */}
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="h-8 w-16 flex items-center justify-center">
        <Badge variant="outline" className="h-6 w-full text-xs font-mono flex items-center justify-center">
          {item.time}
        </Badge>
      </div>
      {!isLast && <div className="w-0.5 h-6 bg-border mt-2" />}
    </div>
    
    {/* Icon - fixed size container for consistent alignment */}
    <div className="flex-shrink-0">
      <div className="p-1.5 border rounded-md w-8 h-8 flex items-center justify-center">
        <item.icon size={16} className="text-muted-foreground" />
      </div>
    </div>
    
    {/* Content - flexible width */}
    <div className="flex items-center justify-between flex-1 min-w-0 h-8">
      <span className="text-sm leading-relaxed pr-2">{item.event}</span>
      {item.url && (
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
        >
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
        
        <header className="text-center space-y-4">
          <div className="flex justify-center">
            <Mountain className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">西田の心癒しツアー</h1>
          </div>
        </header>

        <div className="space-y-6">
          {tripData.days.map((day) => (
            <Card key={day.day}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <day.icon className="h-5 w-5" />
                  <div>
                    <CardTitle className="text-xl">Day {day.day}: {day.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Route Map */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Map className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-semibold text-sm">ルートマップ</h4>
                  </div>
                  <div className="w-full h-64 rounded-lg overflow-hidden border">
                    <iframe
                      src={day.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Day ${day.day} Route Map`}
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    スケジュール
                  </h4>
                  <div className="space-y-4">
                    {day.schedule.map((item, index) => (
                      <TimelineItem 
                        key={index} 
                        item={item} 
                        isLast={index === day.schedule.length - 1}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                {tripData.budget.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tripData.budget.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.item}</span>
                    <span>{item.cost}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-4">
                  <div className="flex justify-between font-semibold">
                    <span>合計</span>
                    <span>{tripData.budget.total}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                {tripData.notes.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tripData.notes.items.map((note, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <footer className="text-center py-4 border-t">
          <p className="text-sm text-muted-foreground">
            この旅のしおりで、最高の愛媛旅行を！
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;