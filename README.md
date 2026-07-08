# Mesaj Raid Bot

Discord'da buton ile otomatik mesaj gönderen basit bir bot.

## Kurulum

```bash
npm install
```

## Ayarlar

`.env` dosyasını düzenleyin:

```env
TOKEN=bot_tokenin
MESSAGE_COUNT=5
MESSAGE_DELAY_MS=1000
```

| Değişken | Açıklama | Varsayılan |
|---|---|---|
| `TOKEN` | Discord bot tokeniniz | zorunlu |
| `MESSAGE_COUNT` | Gönderilecek mesaj sayısı | 5 |
| `MESSAGE_DELAY_MS` | Mesajlar arası bekleme (ms) | 1000 |

## Kullanım

1. Botu çalıştırın: `npm start` veya `start.bat`
2. Discord'da `/message-button icerik:yazı` komutunu kullanın
3. Çıkan "Gönder" butonuna tıklayın
4. Bot belirtilen mesajı ayarlanan kadar göndersin

