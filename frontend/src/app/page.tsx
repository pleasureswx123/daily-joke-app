import JokeCard from '@/components/JokeCard';
import { Joke } from '@/types/joke';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function getRandomJoke(): Promise<Joke> {
  const response = await fetch(`${API_BASE_URL}/daily-joke`);
  if (!response.ok) {
    throw new Error('Failed to fetch joke');
  }
  const data = await response.json();
  return data.joke;
}

export default async function Home() {
  const joke = await getRandomJoke();

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
            id={joke.id}
            setup={joke.setup}
            punchline={joke.punchline}
            created_at={joke.created_at}
          />
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            每次刷新随机获取一个笑话
          </p>
        </div>
      </div>
    </main>
  );
}
