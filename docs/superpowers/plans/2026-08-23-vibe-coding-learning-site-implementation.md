# Vibe Coding Learning Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver and publish the Vibe Coding Field Manual.

**Architecture:** Astro renders typed MDX to static routes; small TypeScript islands persist progress locally.

**Tech Stack:** Astro 7, MDX, TypeScript, Vitest, Playwright, GitHub Pages Actions.

**Spec:** `docs/superpowers/specs/2026-08-23-vibe-coding-learning-site-design.md`

## Global Constraints

- Base path `/vibe-coding/`; storage key `vibeCodingLearningProgress.v1`.
- Upstream material is linked and paraphrased, never vendored.

### Task 1: Course engine

- [x] Define typed content, graph validation, local progress, and exact-set scoring.
- [x] Cover malformed state, current-id filtering, scoring, duplicate ids, missing dependencies, and cycles.

### Task 2: Learning interface

- [x] Build all routes, interactions, 11 original lessons, and source trails.
- [x] Verify desktop/mobile persistence, base paths, capstone, and 404 behavior.

### Task 3: Deployment

- [x] Add README, license, lockfile, Node version, and Pages workflow.
- [x] Push `main`, enable Pages, and verify the public URL.

Deployment verified on 2026-08-24: [public site](https://superdoge1.github.io/vibe-coding/) and [successful verify/build/deploy run](https://github.com/superdoge1/vibe-coding/actions/runs/32683597062).
