# Vibe Coding Learning Site Design

## Goal

Build a Chinese, static, interactive learning path that takes a beginner from a first AI-assisted product to repeatable Agent engineering practices.

## Curriculum and experience

Eleven ordered MDX lessons form three phases: product entry, Agent engineering, and capstone delivery. Easy‑Vibe is the primary beginner reference; Claude Code Best Practice is the primary engineering reference. The dark field-manual interface presents a continuous build trace. Learners can complete lessons, answer exact-set quizzes, and save notes locally.

## Reliability and acceptance

Content frontmatter is typed. A build-time graph check rejects duplicate ids, missing prerequisites, and cycles. Malformed or unknown progress data falls back to an empty v1 state. GitHub Pages uses `/vibe-coding/`. Type checks, unit tests, desktop/mobile paths, and production build must pass.
