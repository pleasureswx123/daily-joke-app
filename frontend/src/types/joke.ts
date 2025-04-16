export interface Joke {
  id: number;
  setup: string;
  punchline: string;
  created_at: Date;
}

export interface RandomJokeResponse {
  joke: Joke;
} 