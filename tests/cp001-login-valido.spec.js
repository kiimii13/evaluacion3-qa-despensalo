import 'dotenv/config';
import { test, expect } from '@playwright/test';

test('CP-001 - Login válido', async ({ page }, testInfo) => {
  if (!process.env.DESPENSALO_EMAIL || !process.env.DESPENSALO_PASSWORD) {
    throw new Error('Faltan las credenciales en el archivo .env');
  }

  await page.goto('https://despensalo.cl/');

  await page
    .getByRole('textbox', { name: 'nombre@correo.cl' })
    .fill(process.env.DESPENSALO_EMAIL);

  await page
    .getByRole('textbox', { name: 'Mínimo 8 caracteres' })
    .fill(process.env.DESPENSALO_PASSWORD);

  await page
    .getByRole('button', { name: 'Ingresar a Despénsalo' })
    .click();

  const resumenInicio = page.getByRole('heading', {
    name: 'Resumen',
    exact: true,
  });

  await expect(resumenInicio).toBeVisible();

  await testInfo.attach('EV-CP001 - Sesión iniciada correctamente', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});