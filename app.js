const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

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

    res.status(201).json(property);
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});