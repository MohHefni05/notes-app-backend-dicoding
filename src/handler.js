// nanoid untuk membuat angka unik untuk id
const { nanoid } = require("nanoid");
// inisiasi untuk penyimpanan datanya, disini pakai array dan hanya bersifat sementara
const notes = require("./notes");

const addNoteHandler = (request, h) => {
    // untuk ambil payload/body request biasanya dikirim di form
    const { title, tags, body } = request.payload;
    // membuat kode unik untuk id sebanyak 16
    const id = nanoid(16);
    // membuat tanggal yang nantinya di output ke toISOString()
    const createdAt = new Date().toISOString();
    // agar tidak 2 kali membuat tinggal ambil aja
    const updatedAt = createdAt;
    
    // ini ditampung
    const newNote = {
        id, title, tags, body, createdAt, updatedAt
    }

    // dan di push ke notes agar jadi format json
    notes.push(newNote);

    // jika response 0 itu berarti sukses
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    // jika true berarti sukses
    if (isSuccess) {
        // h yaitu untuk response ke client
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil ditambahkan',
          data: {
            noteId: id,
          },
        });
        response.code(201);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;
};

// ambil semua data dari array notes
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
  });

//   melihat detail 1 data
  const getNoteByIdHandler = (request, h) => {
    // ambil id
    const { id } = request.params;
   
    // dapatkan objek note dengan id tersebut dari objek array notes
    const note = notes.filter((n) => n.id === id)[0];
   
    // kembalikan fungsi handler dengan data beserta objek note di dalamnya. pastikan dulu objek note tidak bernilai undefined. Bila undefined, kembalikan dengan respons gagal.
   if (note !== undefined) {
      return {
        status: 'success',
        data: {
          note,
        },
      };
    }
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;

    const updatedAt = new Date().toISOString();

    // memanfaatkan indexing array
    // dapatkan dulu index array pada objek catatan sesuai id yang ditentukan. gunakanlah method array findIndex().
    const index = notes.findIndex((note) => note.id === id);

    // Bila id ditemukan, maka index akan bernilai array index dari objek catatan yang dicari. bila tidak ditemukan, maka index bernilai -1. Jadi bisa menentukan gagal atau tidaknya permintaan dari nilai index menggunakan if else.
    if (index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
    };

    const response = h.response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
   
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const index = notes.findIndex((note) => note.id === id);
   
    if (index !== -1) {
    // jika datanya ada hapus dari array
      notes.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      });
      response.code(200);
      return response;
    }
   
   const response = h.response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

// export agar bisa digunakan handler tersebut di route
module.exports = { addNoteHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler, 
    editNoteByIdHandler, 
    deleteNoteByIdHandler
};