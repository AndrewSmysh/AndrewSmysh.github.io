<?php

// Отримання даних з форми
$name = $_POST['name'];
$surname = $_POST['surname'];
$phone = $_POST['number'];
$city = $_POST['city'];
$post_num = $_POST['post_num'];
$selectedItems2 = $_POST['selectedI'];


// Токен вашого бота
$token = "6102595936:AAEGDcHpOM3fi4tzrJryYlbdwE-wYaDb_60";

// Ідентифікатор чату або користувача в Telegram, куди ви хочете відправити повідомлення
$chat_id = "-940285424";

// Формування текстового повідомлення

$message .= "Ім'я: $name\n";
$message .= "Прізвище: $surname\n";
$message .= "Телефон: $phone\n";
$message .= "Місто: $city\n";
$message .= "Номер пошти: $post_num\n";
$message .= "Замовлення клієнта: $selectedItems2\n";




// URL для відправки повідомлення на Telegram
$telegram_url = "https://api.telegram.org/bot$token/sendMessage";

// Дані для відправки на Telegram у вигляді асоціативного масиву
$data = [
    'chat_id' => $chat_id,
	'text' => $message 
];


// Відправка повідомлення на Telegram
$options = [
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query($data),
    ],
];

$context = stream_context_create($options);
$result = file_get_contents($telegram_url, false, $context);

// Перевірка результату відправки
if ($result === false) {
    echo "Помилка відправки на Telegram.";
} else {
    header('Location: thank-you.html');
}
?>
