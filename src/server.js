// inisiasi hapi js pada file utama dikarenakan disini kita akan membuat http servernya
const Hapi = require('@hapi/hapi');
// untuk mengambil routesnya lalu lintas pertama
const routes = require('./routes');

// membuat http server yang dibalut dengan variabel dan callback function
const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        // routes ini agar terhindar dari CORS atau Same-Origin Policy bisa ditaruh setiap routes atau disini agar global untuk seluruh routesnya
        routes: {
            cors: {
                // kenapa pakek * agar semua memperbolehkan data dikonsumsi oleh seluruh origin.
                origin: ['*'],
            },
        },
    });
    
    // seharusnya routesnya ditaruh disini tapi karena mau dipisahin dengan modules maka panggil variabel yang inisiasi routesnya
    // maka nodejs akan masuk ke routes
    server.route(routes);

    // selanjutnya di start
    await server.start();

    // 
    console.log(`Server berjalan pada ${server.info.uri}`);
}

// untuk memanggil varibel
init();