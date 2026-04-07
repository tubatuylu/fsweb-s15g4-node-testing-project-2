exports.seed = async function (knex) {
  await knex('hobiler').truncate();
  await knex('hobiler').insert([
    { isim: 'Yüzme', kategori: 'Spor' },
    { isim: 'Satranç', kategori: 'Zeka' },
    { isim: 'Resim', kategori: 'Sanat' },
    { isim: 'Futbol', kategori: 'Spor' },
    { isim: 'Müzik', kategori: 'Sanat' },
  ]);
};
