import 'dotenv/config';
import { test, expect } from '@playwright/test';

test('CP-004 - Impedir registro de producto sin nombre', async ({ page }, testInfo) => {
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

  await expect(
    page.getByRole('heading', { name: 'Resumen', exact: true })
  ).toBeVisible();

  await page
    .getByRole('button', { name: /Inventario/ })
    .click();

  await expect(
    page.getByRole('heading', { name: 'Inventario', exact: true })
  ).toBeVisible();

  await page
    .getByRole('button', { name: /Producto$/ })
    .click();

  const formularioProducto = page.getByRole('heading', {
    name: 'Registrar producto',
    exact: true,
  });

  const campoNombre = page.getByRole('combobox', {
    name: 'Ej.: Arroz grado 2',
  });

  await expect(formularioProducto).toBeVisible();
  await expect(campoNombre).toBeVisible();
  await expect(campoNombre).toHaveValue('');

  await page
    .getByRole('button', { name: 'Guardar producto' })
    .click();

  const mensajeValidacion = page.getByText(
    'Escribe el nombre del producto',
    { exact: true }
  );

  await expect(mensajeValidacion).toBeVisible();
  await expect(formularioProducto).toBeVisible();
  await expect(campoNombre).toHaveValue('');

  await testInfo.attach('EV-CP004 - Validación de nombre obligatorio', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});