const amqp = require('amqplib')
require("dotenv").config();

const produceMessage = async () => {
    const rabbitmqUrl = `amqp://${process.env.USER}:${process.env.PASSWORD}@${process.env.URL}/`

    try {
        // Membuat koneksi ke RabbitMQ server
        const connection = await amqp.connect(rabbitmqUrl)

        // Membuat channel
        const channel = await connection.createChannel()

        // Mendeklarasikan nama exchange
        const exchange = 'patroli';

        // Mendeklarasikan routing key
        const routingKey = 'report'

        // Mendeklarasikan data yang akan dikirim
        const payload = `Message from server ${new Date()}`;

        // Mengirim data setiap 5 detik menggunakan setInterval
        setInterval(() => {
            // Mengirim pesan ke exchange dengan routing key kosong
            channel.publish(exchange, routingKey, Buffer.from(payload));
            console.log(payload);
        }, 600000);

        // Menampilkan informasi bahwa aplikasi telah terhubung saat dijalankan
        console.log('Aplikasi berhasil terhubung ke RabbitMQ server.')
    } catch (error) {
        console.error('Error:', error)
    }
}

produceMessage()