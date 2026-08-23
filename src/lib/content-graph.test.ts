import { describe, expect, it } from 'vitest';
import { validateLessonGraph } from './content-graph';

const lesson = (id: string, prerequisites: string[] = []) => ({ id, prerequisites });

describe('validateLessonGraph', () => {
  it('accepts an ordered acyclic curriculum', () => {
    expect(validateLessonGraph([lesson('start'), lesson('build', ['start'])])).toEqual([]);
  });

  it('reports duplicate ids and missing prerequisites', () => {
    expect(validateLessonGraph([lesson('start'), lesson('start'), lesson('ship', ['review'])])).toEqual([
      'Duplicate lesson id: start',
      'Lesson ship references missing prerequisite: review',
    ]);
  });

  it('reports dependency cycles', () => {
    expect(validateLessonGraph([lesson('plan', ['build']), lesson('build', ['plan'])])).toEqual([
      'Lesson dependency cycle: plan -> build -> plan',
    ]);
  });
});
