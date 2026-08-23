import { describe, expect, it } from 'vitest';
import {
  calculateProgress,
  createEmptyProgress,
  parseProgress,
  scoreQuiz,
} from './progress';

describe('parseProgress', () => {
  it('returns an empty v1 state when persisted JSON is malformed', () => {
    expect(parseProgress('{broken')).toEqual(createEmptyProgress());
  });

  it('returns an empty v1 state for an unknown schema version', () => {
    expect(parseProgress(JSON.stringify({ version: 99 }))).toEqual(createEmptyProgress());
  });

  it('keeps only completed lessons that still exist', () => {
    const raw = JSON.stringify({
      version: 1,
      completedLessonIds: ['intro', 'removed'],
      quizScores: {},
      notes: {},
      updatedAt: '2026-08-22T00:00:00.000Z',
    });

    expect(parseProgress(raw, ['intro', 'agent-workflow']).completedLessonIds).toEqual(['intro']);
  });
});

describe('calculateProgress', () => {
  it('calculates completion against the current curriculum', () => {
    expect(calculateProgress(['intro', 'removed'], ['intro', 'workflow', 'ship'])).toEqual({
      completed: 1,
      total: 3,
      percentage: 33,
    });
  });
});

describe('scoreQuiz', () => {
  it('requires the exact answer set for multi-select questions', () => {
    expect(scoreQuiz(['plan', 'test'], ['test', 'plan'])).toBe(true);
    expect(scoreQuiz(['plan'], ['plan', 'test'])).toBe(false);
    expect(scoreQuiz(['plan', 'test', 'guess'], ['plan', 'test'])).toBe(false);
  });
});
