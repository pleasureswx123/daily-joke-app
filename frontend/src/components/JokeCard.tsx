'use client';

import { useState } from 'react';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { Joke } from '@/types/joke';

interface JokeCardProps extends Partial<Joke> {
  enableLikes?: boolean;
}

export default function JokeCard({ setup, punchline, created_at, enableLikes = true }: JokeCardProps) {
  const [likes, setLikes] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {created_at ? new Date(created_at).toLocaleDateString('zh-CN') : '今日'}
          </span>
          {enableLikes && (
            <button
              onClick={() => setLikes(prev => prev + 1)}
              className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              <HandThumbUpIcon className="h-5 w-5 mr-1" />
              <span>{likes}</span>
            </button>
          )}
        </div>

        <div className="space-y-3">
          {setup && (
            <p className="text-gray-800 text-lg font-medium">
              {setup}
            </p>
          )}
          
          {setup ? (
            <button
              onClick={() => setIsRevealed(true)}
              className="w-full"
            >
              <p className={`text-lg ${isRevealed ? 'text-gray-800' : 'text-transparent bg-gray-200 rounded'} transition-colors duration-300`}>
                {punchline}
              </p>
            </button>
          ) : (
            <p className="text-gray-800 text-lg">
              {punchline}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 