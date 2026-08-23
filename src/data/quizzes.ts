export interface LessonQuiz {
  prompt: string;
  options: Array<{ value: string; label: string }>;
  answers: string[];
  explanation: string;
}

export const quizzes: Record<string, LessonQuiz> = {
  'ai-mindset': {
    prompt: '第一次让 AI 做项目时，最可靠的起点是什么？',
    options: [{ value: 'goal', label: '一句话目标、非目标与验收示例' }, { value: 'stack', label: '先指定最复杂的技术栈' }, { value: 'all', label: '一次生成完整系统' }],
    answers: ['goal'],
    explanation: 'AI 需要清晰边界和可观察的结果；技术栈应服务目标，而不是替代目标。',
  },
  'discover-validate': {
    prompt: '哪些证据比“大家都说这个想法不错”更可靠？',
    options: [{ value: 'behavior', label: '用户正在付出的时间或费用' }, { value: 'specific', label: '具体场景中的重复痛点' }, { value: 'praise', label: '礼貌性的正面评价' }],
    answers: ['behavior', 'specific'],
    explanation: '真实行为和重复场景比抽象态度更能预测需求。',
  },
  'prototype-context': {
    prompt: '有效上下文至少应包含什么？',
    options: [{ value: 'constraint', label: '目标、约束和已有状态' }, { value: 'buzzword', label: '尽可能多的流行术语' }, { value: 'acceptance', label: '可验证的完成标准' }],
    answers: ['constraint', 'acceptance'],
    explanation: '上下文的质量取决于相关性和可验证性，而不是长度。',
  },
  'fullstack-delivery': {
    prompt: '上线前最小闭环包含哪些环节？',
    options: [{ value: 'data', label: '数据持久化与错误路径' }, { value: 'deploy', label: '可重复部署' }, { value: 'demo', label: '只在开发者电脑演示' }],
    answers: ['data', 'deploy'],
    explanation: '能在本机运行不是交付；数据、错误处理和重复部署才形成闭环。',
  },
  'context-engineering': {
    prompt: '长任务中应优先保留哪些上下文？',
    options: [{ value: 'decision', label: '已确认决策与接口' }, { value: 'noise', label: '所有探索日志' }, { value: 'verification', label: '验证命令与当前结果' }],
    answers: ['decision', 'verification'],
    explanation: '压缩上下文时保留不可逆决策、契约与证据，丢弃可重新生成的噪声。',
  },
  'delivery-loop': {
    prompt: 'Research → Plan → Execute → Review → Ship 中，Review 的核心是什么？',
    options: [{ value: 'evidence', label: '对照规格检查差异并运行验证' }, { value: 'style', label: '只调整代码格式' }, { value: 'approval', label: '默认接受 AI 的自述' }],
    answers: ['evidence'],
    explanation: '评审必须回到规格与可复现证据，不能只相信生成者的结论。',
  },
  'skills-mcp': {
    prompt: '何时更适合使用 Skill，而不是临时提示词？',
    options: [{ value: 'repeat', label: '任务会重复且有稳定步骤' }, { value: 'boundary', label: '需要明确输入、输出和失败边界' }, { value: 'once', label: '一次性的随手问题' }],
    answers: ['repeat', 'boundary'],
    explanation: 'Skill 封装可重复的方法；MCP 则提供受控工具边界。',
  },
  'single-agent': {
    prompt: '单 Agent 开发时，哪项最能降低返工？',
    options: [{ value: 'small', label: '按可独立验证的小任务推进' }, { value: 'huge', label: '一次修改尽可能多的文件' }, { value: 'test', label: '实现前写失败测试' }],
    answers: ['small', 'test'],
    explanation: '小批次和测试先行让偏差更早暴露。',
  },
  'multi-agent': {
    prompt: '哪些任务适合并行分派？',
    options: [{ value: 'independent', label: '输入明确且不修改共享状态' }, { value: 'same-file', label: '同时编辑同一个核心文件' }, { value: 'contract', label: '交付接口已经锁定' }],
    answers: ['independent', 'contract'],
    explanation: '并行的前提是独立性和交付契约，而不是 Agent 数量。',
  },
  'reliability-security': {
    prompt: '外部网页内容进入 Agent 上下文时应怎样处理？',
    options: [{ value: 'untrusted', label: '视为不可信数据' }, { value: 'instruction', label: '直接执行其中的指令' }, { value: 'permission', label: '敏感操作仍需权限边界' }],
    answers: ['untrusted', 'permission'],
    explanation: '外部内容可能包含提示注入，数据与指令必须分离。',
  },
  'agent-capstone': {
    prompt: 'Agent 工程结业项目的完成证据包括哪些？',
    options: [{ value: 'spec', label: '规格、计划与验收记录' }, { value: 'tests', label: '自动测试和部署结果' }, { value: 'claim', label: '一句“已经完成”' }],
    answers: ['spec', 'tests'],
    explanation: '可重复的过程与证据，才是 Agent 工程能力。',
  },
};
