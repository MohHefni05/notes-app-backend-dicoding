// setelah masuk ke routes dari server js maka node akan mencari url sesuai request
// inisiasi karena akan memisahkan routes dengan handler
const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [
    {
        // untuk method http
        method: 'POST',
        // untuk pathnya
        path: '/notes',
        // handler yang berisi callback fuction untuk pemprosesan response dan request
        // namun disini dipisah menggunakan module untuk mempermudah
        handler: addNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
      },
      {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
      },
      {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
      },
      {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
      },
];

module.exports = routes;