import { expect, test } from '@playwright/test';

test.describe('approved console design contracts', () => {
  test('uses the exact approved nine-token palette', async ({ page }) => {
    await page.goto('./');

    const tokens = await page.locator(':root').evaluate((root) => {
      const styles = getComputedStyle(root);
      return Object.fromEntries([
        ['background', '--ink'],
        ['panel', '--panel'],
        ['raisedPanel', '--panel-raised'],
        ['text', '--text'],
        ['muted', '--muted'],
        ['signal', '--signal'],
        ['info', '--cyan'],
        ['agent', '--violet'],
        ['line', '--line'],
      ].map(([name, property]) => [name, styles.getPropertyValue(property).trim().toLowerCase()]));
    });

    expect(tokens).toEqual({
      background: '#070a0f',
      panel: '#0e151d',
      raisedPanel: '#131d27',
      text: '#f0f5f1',
      muted: '#97aaa4',
      signal: '#baf46d',
      info: '#68dce5',
      agent: '#9f91ff',
      line: '#273440',
    });
  });

  test('keeps lesson outcome body copy at least 16px', async ({ page }) => {
    await page.goto('./');
    const fontSize = await page.locator('.lesson-card .outcome').first().evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
    expect(fontSize).toBeGreaterThanOrEqual(16);
  });

  test('keeps at least 8px between desktop navigation actions', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('./');
    const gap = await page.getByRole('navigation', { name: '主导航' }).evaluate((element) => parseFloat(getComputedStyle(element).columnGap));
    expect(gap).toBeGreaterThanOrEqual(8);
  });

  test('keeps course-card links at least 44px tall on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('./');
    const heights = await page.locator('.lesson-card h3 a').evaluateAll((links) => links.map((link) => link.getBoundingClientRect().height));
    expect(Math.min(...heights)).toBeGreaterThanOrEqual(44);
  });
});

test('agent console keeps its responsive learning contract', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');

  await expect(page.locator('body')).toHaveAttribute('data-interface', 'agent-console');
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

  const primaryCta = page.getByRole('link', { name: '开始第一次构建' });
  await expect(primaryCta).toBeVisible();
  expect(await primaryCta.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);

  const navigationLinks = page.getByRole('navigation', { name: '主导航' }).getByRole('link');
  await expect(navigationLinks).toHaveCount(4);
  for (const link of await navigationLinks.all()) {
    expect(await link.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
  }

  await expect(page.locator('[data-entrance]').first()).toHaveCSS('animation-name', 'none');
  const percentage = page.locator('[data-progress-percentage]');
  await expect(percentage).toHaveText('0%');

  await primaryCta.click();
  await expect(page.locator('[data-lesson-controls]')).toHaveAttribute('data-ready', 'true');
  await page.getByRole('button', { name: '标记本节完成' }).click();
  await page.getByRole('link', { name: 'Vibe Coding 首页' }).click();
  await expect(percentage).toHaveText('9%');
});

test('learner completes a lesson and keeps progress after reload', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: '先做出来。 再做可靠。' })).toBeVisible();
  await page.getByRole('link', { name: '开始第一次构建' }).click();
  await expect(page.getByRole('heading', { name: '把一句想法变成第一次构建' })).toBeVisible();
  await expect(page.locator('[data-lesson-controls]')).toHaveAttribute('data-ready', 'true');

  await page.getByLabel('学习笔记 仅保存在这台设备').fill('先写目标和验收，再选择技术栈。');
  await page.getByLabel('一句话目标、非目标与验收示例').check();
  await page.getByRole('button', { name: '检查答案' }).click();
  await expect(page.getByText('正确。把这条原则带进下一次构建。')).toBeVisible();
  await page.getByRole('button', { name: '标记本节完成' }).click();
  await page.reload();

  await expect(page.getByRole('button', { name: '已完成 · 点击撤销' })).toBeVisible();
  await expect(page.getByLabel('学习笔记 仅保存在这台设备')).toHaveValue('先写目标和验收，再选择技术栈。');
  await page.evaluate(() => {
    Storage.prototype.setItem = () => { throw new DOMException('full', 'QuotaExceededError'); };
  });
  await page.getByRole('button', { name: '已完成 · 点击撤销' }).click();
  await expect(page.getByText('浏览器未能保存；本页关闭后会丢失')).toBeVisible();
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
