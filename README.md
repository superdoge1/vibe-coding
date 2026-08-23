# Vibe Coding Field Manual

一套中文交互式学习站：先沿 Easy‑Vibe 的思路完成第一个 AI 产品，再进入上下文工程、Skills、MCP、单/多 Agent 协作、可靠性与安全。

在线站点：<https://superdoge1.github.io/vibe-coding/>

## 本地开发

需要 Node.js 24 与 npm。

```bash
npm ci
npm run dev
```

验证命令：`npm run check`、`npm test`、`npm run test:e2e`、`npm run build`。

课程位于 `src/content/lessons/`，交互组件位于 `src/components/`，状态与课程依赖校验位于 `src/lib/`。学习进度使用 `vibeCodingLearningProgress.v1` 保存在浏览器本地，不上传数据。

## 来源与边界

课程参考 [Easy‑Vibe](https://github.com/datawhalechina/easy-vibe)、[Claude Code Best Practice](https://github.com/shanraisshan/claude-code-best-practice) 与相关官方文档。正文为重新组织的原创教学内容，不复制上游整库或大段文本。工具专属命令应回到对应官方文档核验。

本站代码与原创内容按 [MIT License](LICENSE) 发布；外部链接内容遵循各自许可证。
