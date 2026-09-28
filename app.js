const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// GET informasi API
app.get('/', (req, res) => {
    res.json({
        nama: "Cindy Aulia",
        nim: "2428240134",
        topik: 22,
        endpoint: [
            "GET /properties",
            "GET /properties/:id",
            "GET /properties?kota=Surabaya",
            "POST /properties",
            "PUT /properties/:id",
            "DELETE /properties/:id"
        ]
    });
});

// Data awal properti
let properties = [
    {
        id: 1,
        judul: "Rumah Minimalis 2 Lantai",
        tipe: "rumah",
        kota: "Surabaya",
        luasM2: 120,
        harga: 1250000000
    },
    {
        id: 2,
        judul: "Apartemen Modern",
        tipe: "apartemen",
        kota: "Jakarta",
        luasM2: 45,
        harga: 850000000
    },
    {
        id: 3,
        judul: "Ruko Strategis",
        tipe: "ruko",
        kota: "Bandung",
        luasM2: 100,
        harga: 1500000000
    }
];

let nextId = 4;

// GET semua properties
app.get('/properties', (req, res) => {
    const { kota } = req.query;

    if (kota) {
        const hasil = properties.filter((property) => property.kota === kota);
        return res.json(hasil);
    }

    res.json(properties);
});

// GET property berdasarkan id
app.get('/properties/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const property = properties.find((property) => property.id === id);

    if (!property) {
        return res.status(404).json({
            status: "error",
            message: "Property tidak ditemukan"
        });
    }

    res.json(property);
});

// POST property
app.post('/properties', (req, res) => {
    const { judul, tipe, kota, luasM2, harga } = req.body;

    if (!judul || !tipe || !kota || luasM2 === undefined || harga === undefined) {
        return res.status(400).json({
            status: "error",
            message: "Semua field wajib diisi",
            data: null
        });
    }

    const property = {
        id: nextId,
        judul,
        tipe,
        kota,
        luasM2,
        harga
    };

    properties.push(property);
    nextId++;

    res.status(201).json({
        status: "success",
        message: "Property berhasil ditambahkan",
        data: property
    });
});

// PUT property berdasarkan id
app.put('/properties/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const property = properties.find((property) => property.id === id);

    if (!property) {
        return res.status(404).json({
            status: "error",
            message: "Property tidak ditemukan",
            data: null
        });
    }

    const { judul, tipe, kota, luasM2, harga } = req.body;

    if (!judul || !tipe || !kota || luasM2 === undefined || harga === undefined) {
        return res.status(400).json({
            status: "error",
            message: "Semua field wajib diisi",
            data: null
        });
    }

    property.judul = judul;
    property.tipe = tipe;
    property.kota = kota;
    property.luasM2 = luasM2;
    property.harga = harga;

    res.json({
        status: "success",
        message: "Property berhasil diperbarui",
        data: property
    });
});

// DELETE property berdasarkan id
app.delete('/properties/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = properties.findIndex((property) => property.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: "error",
            message: "Property tidak ditemukan"
        });
    }

    const property = properties[index];

    properties.splice(index, 1);

    res.json({
        status: "success",
        message: "Property berhasil dihapus",
        data: property
    });
});

// 404 jika endpoint tidak ditemukan
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Endpoint tidak ditemukan",
        data: null
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});