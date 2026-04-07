const request = require('supertest');
const server = require('../server');
const db = require('../../data/db-config');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

// ─── GET /api/hobiler ──────────────────────────────────────────────────────────

describe('[GET] /api/hobiler', () => {
  test('1 - 200 status döner', async () => {
    const res = await request(server).get('/api/hobiler');
    expect(res.status).toBe(200);
  });

  test('2 - JSON dizisi döner', async () => {
    const res = await request(server).get('/api/hobiler');
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('3 - Seed sonrası 5 kayıt döner', async () => {
    const res = await request(server).get('/api/hobiler');
    expect(res.body).toHaveLength(5);
  });

  test('4 - Her kayıtta isim ve kategori alanı bulunur', async () => {
    const res = await request(server).get('/api/hobiler');
    res.body.forEach((hobi) => {
      expect(hobi).toHaveProperty('isim');
      expect(hobi).toHaveProperty('kategori');
    });
  });
});

// ─── GET /api/hobiler/:id ──────────────────────────────────────────────────────

describe('[GET] /api/hobiler/:id', () => {
  test('5 - Var olan id için 200 döner', async () => {
    const res = await request(server).get('/api/hobiler/1');
    expect(res.status).toBe(200);
  });

  test('6 - Var olan id için doğru hobi döner', async () => {
    const res = await request(server).get('/api/hobiler/1');
    expect(res.body).toMatchObject({ isim: 'Yüzme', kategori: 'Spor' });
  });

  test('7 - Olmayan id için 404 döner', async () => {
    const res = await request(server).get('/api/hobiler/9999');
    expect(res.status).toBe(404);
  });
});

// ─── POST /api/hobiler ─────────────────────────────────────────────────────────

describe('[POST] /api/hobiler', () => {
  test('8 - Yeni hobi 201 ile eklenir', async () => {
    const res = await request(server)
      .post('/api/hobiler')
      .send({ isim: 'Okuma', kategori: 'Kültür' });
    expect(res.status).toBe(201);
  });

  test('9 - Eklenen hobi response body içinde döner', async () => {
    const res = await request(server)
      .post('/api/hobiler')
      .send({ isim: 'Okuma', kategori: 'Kültür' });
    expect(res.body).toMatchObject({ isim: 'Okuma', kategori: 'Kültür' });
  });

  test('10 - Eksik alan ile 400 döner', async () => {
    const res = await request(server)
      .post('/api/hobiler')
      .send({ isim: 'Okuma' });
    expect(res.status).toBe(400);
  });
});

// ─── PUT /api/hobiler/:id ──────────────────────────────────────────────────────

describe('[PUT] /api/hobiler/:id', () => {
  test('11 - Var olan hobi güncellenir', async () => {
    const res = await request(server)
      .put('/api/hobiler/1')
      .send({ isim: 'Yüzme Pro', kategori: 'Spor' });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ isim: 'Yüzme Pro' });
  });

  test('12 - Olmayan id için PUT 404 döner', async () => {
    const res = await request(server)
      .put('/api/hobiler/9999')
      .send({ isim: 'Test' });
    expect(res.status).toBe(404);
  });
});

// ─── DELETE /api/hobiler/:id ───────────────────────────────────────────────────

describe('[DELETE] /api/hobiler/:id', () => {
  test('13 - Var olan hobi silinir ve 200 döner', async () => {
    const res = await request(server).delete('/api/hobiler/1');
    expect(res.status).toBe(200);
  });

  test('14 - Silinen hobi artık listede yoktur', async () => {
    await request(server).delete('/api/hobiler/1');
    const res = await request(server).get('/api/hobiler');
    expect(res.body).toHaveLength(4);
  });

  test('15 - Olmayan id için DELETE 404 döner', async () => {
    const res = await request(server).delete('/api/hobiler/9999');
    expect(res.status).toBe(404);
  });
});
