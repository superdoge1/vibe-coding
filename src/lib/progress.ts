export interface QuizScore {
  score: number;
  total: number;
  answeredAt: string;
}

export interface ProgressState {
  version: 1;
  completedLessonIds: string[];
  quizScores: Record<string, QuizScore>;
  notes: Record<string, string>;
  updatedAt: string;
}

export const createEmptyProgress = (): ProgressState => ({
  version: 1,
  completedLessonIds: [],
  quizScores: {},
  notes: {},
  updatedAt: '',
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function parseProgress(raw: string | null, validLessonIds?: string[]): ProgressState {
  if (!raw) return createEmptyProgress();

  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || value.version !== 1) return createEmptyProgress();

    const allowed = validLessonIds ? new Set(validLessonIds) : null;
    const completedLessonIds = Array.isArray(value.completedLessonIds)
      ? [...new Set(value.completedLessonIds.filter((id): id is string =>
          typeof id === 'string' && (!allowed || allowed.has(id))))]
      : [];

    return {
      version: 1,
      completedLessonIds,
      quizScores: isRecord(value.quizScores) ? value.quizScores as Record<string, QuizScore> : {},
      notes: isRecord(value.notes)
        ? Object.fromEntries(Object.entries(value.notes).filter((entry): entry is [string, string] => typeof entry[1] === 'string'))
        : {},
      updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : '',
    };
  } catch {
    return createEmptyProgress();
  }
}

export function calculateProgress(completedIds: string[], curriculumIds: string[]) {
  const completedSet = new Set(completedIds);
  const completed = curriculumIds.filter((id) => completedSet.has(id)).length;
  const total = curriculumIds.length;
  return {
    completed,
    total,
    percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

export function scoreQuiz(selected: string[], expected: string[]) {
  if (selected.length !== expected.length) return false;
  const selectedSet = new Set(selected);
  return expected.every((answer) => selectedSet.has(answer));
}
