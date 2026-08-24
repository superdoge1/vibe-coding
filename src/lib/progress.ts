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

const isQuizScore = (value: unknown): value is QuizScore =>
  isRecord(value) &&
  Number.isInteger(value.score) &&
  Number.isInteger(value.total) &&
  (value.score as number) >= 0 &&
  (value.total as number) > 0 &&
  (value.score as number) <= (value.total as number) &&
  typeof value.answeredAt === 'string';

export function parseProgress(raw: string | null, validLessonIds?: string[]): ProgressState {
  if (!raw) return createEmptyProgress();

  try {
    const value: unknown = JSON.parse(raw);
    if (
      !isRecord(value) || value.version !== 1 ||
      !Array.isArray(value.completedLessonIds) || !value.completedLessonIds.every((id) => typeof id === 'string') ||
      !isRecord(value.quizScores) || !Object.values(value.quizScores).every(isQuizScore) ||
      !isRecord(value.notes) || !Object.values(value.notes).every((note) => typeof note === 'string') ||
      typeof value.updatedAt !== 'string'
    ) return createEmptyProgress();

    const allowed = validLessonIds ? new Set(validLessonIds) : null;
    const completedLessonIds = [...new Set(value.completedLessonIds.filter((id) => !allowed || allowed.has(id)))];
    const keepCurrentLesson = ([id]: [string, unknown]) => !allowed || allowed.has(id);

    return {
      version: 1,
      completedLessonIds,
      quizScores: Object.fromEntries(Object.entries(value.quizScores).filter(keepCurrentLesson)) as Record<string, QuizScore>,
      notes: Object.fromEntries(Object.entries(value.notes).filter(keepCurrentLesson)) as Record<string, string>,
      updatedAt: value.updatedAt,
    };
  } catch {
    return createEmptyProgress();
  }
}

type ProgressStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function readStoredProgress(storage: Pick<ProgressStorage, 'getItem'>, key: string, validLessonIds?: string[]) {
  try {
    return parseProgress(storage.getItem(key), validLessonIds);
  } catch {
    return createEmptyProgress();
  }
}

export function saveStoredProgress(storage: Pick<ProgressStorage, 'setItem'>, key: string, state: ProgressState) {
  try {
    storage.setItem(key, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function clearStoredProgress(storage: Pick<ProgressStorage, 'removeItem'>, key: string) {
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
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
