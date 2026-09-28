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

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});