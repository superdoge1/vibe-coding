import { expect, test } from '@playwright/test';

test('learner completes a lesson and keeps progress after reload', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: '先做出来。 再做可靠。' })).toBeVisible();
  await page.getByRole('link', { name: '开始第一次构建' }).click();
  await expect(page.getByRole('heading', { name: '把一句想法变成第一次构建' })).toBeVisible();

  await page.getByLabel('学习笔记 仅保存在这台设备').fill('先写目标和验收，再选择技术栈。');
  await page.getByLabel('一句话目标、非目标与验收示例').check();
  await page.getByRole('button', { name: '检查答案' }).click();
  await expect(page.getByText('正确。把这条原则带进下一次构建。')).toBeVisible();
  await page.getByRole('button', { name: '标记本节完成' }).click();
  await page.reload();

  await expect(page.getByRole('button', { name: '已完成 · 点击撤销' })).toBeVisible();
  await expect(page.getByLabel('学习笔记 仅保存在这台设备')).toHaveValue('先写目标和验收，再选择技术栈。');
});

test('base-path navigation and final project route work', async ({ page }) => {
  await page.goto('./roadmap/');
  await expect(page).toHaveURL(/\/vibe-coding\/roadmap\/$/);
  await page.getByRole('link', { name: /交付一个 Agent-ready 仓库/ }).first().click();
  await expect(page).toHaveURL(/\/vibe-coding\/learn\/agent-capstone\/$/);
  await expect(page.getByRole('heading', { name: '交付一个 Agent-ready 仓库' })).toBeVisible();
});

test('unknown route shows a directed 404', async ({ page }) => {
  await page.goto('./not-a-route/');
  await expect(page.getByText('BUILD ERROR · 404')).toBeVisible();
  await expect(page.getByRole('link', { name: '返回学习路线' })).toBeVisible();
});
