import JokeCard from '@/components/JokeCard';
import { jokes } from '@/data/jokes';

export default function Home() {
  // 随机选择一个笑话
  const randomIndex = Math.floor(Math.random() * jokes.length);
  const dailyJoke = jokes[randomIndex];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            开心一刻
          </h1>
          <p className="text-lg text-gray-600">
            刷新页面获取新笑话 😊
          </p>
        </div>

        <div className="mt-12">
          <JokeCard
            setup={dailyJoke.setup}
            punchline={dailyJoke.punchline}
            type={dailyJoke.type}
          />
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            总共 {jokes.length} 个笑话 | 刷新页面换一个
          </p>
        </div>
      </div>
    </main>
  );
}
