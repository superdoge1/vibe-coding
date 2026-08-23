export interface LessonNode {
  id: string;
  prerequisites: string[];
}

export function validateLessonGraph(lessons: LessonNode[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const lesson of lessons) {
    if (ids.has(lesson.id)) errors.push(`Duplicate lesson id: ${lesson.id}`);
    ids.add(lesson.id);
  }

  for (const lesson of lessons) {
    for (const prerequisite of lesson.prerequisites) {
      if (!ids.has(prerequisite)) {
        errors.push(`Lesson ${lesson.id} references missing prerequisite: ${prerequisite}`);
      }
    }
  }

  const graph = new Map(lessons.map((lesson) => [lesson.id, lesson.prerequisites]));
  const visited = new Set<string>();
  const active = new Set<string>();

  const visit = (id: string, path: string[]): string[] | null => {
    if (active.has(id)) {
      const cycleStart = path.indexOf(id);
      return [...path.slice(cycleStart), id];
    }
    if (visited.has(id)) return null;

    active.add(id);
    for (const dependency of graph.get(id) ?? []) {
      if (!graph.has(dependency)) continue;
      const cycle = visit(dependency, [...path, id]);
      if (cycle) return cycle;
    }
    active.delete(id);
    visited.add(id);
    return null;
  };

  for (const lesson of lessons) {
    const cycle = visit(lesson.id, []);
    if (cycle) {
      errors.push(`Lesson dependency cycle: ${cycle.join(' -> ')}`);
      break;
    }
  }

  return errors;
}
