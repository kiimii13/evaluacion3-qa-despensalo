import { test, expect } from '@playwright/test';

test('CP-002 - Login con contraseña incorrecta', async ({ page }, testInfo) => {
  await page.goto('https://despensalo.cl/');

  await page
    .getByRole('textbox', { name: 'nombre@correo.cl' })
    .fill('prueba.invalida@example.com');

  await page
    .getByRole('textbox', { name: 'Mínimo 8 caracteres' })
    .fill('ClaveIncorrecta123');

  await page
    .getByRole('button', { name: 'Ingresar a Despénsalo' })
    .click();

  const mensajeError = page.getByText('Invalid login credentials', {
    exact: true,
  });

  await expect(mensajeError).toBeVisible();

  await testInfo.attach('EV-CP002 - Mensaje de credenciales incorrectas', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});