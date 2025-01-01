import telebot

bot = telebot.TeleBot("7694967219:AAHdEUQG3gtD9sguA7VvhlWtNIULlQMg74c", parse_mode=None) # You can set parse_mode by default. HTML or MARKDOWN

@bot.message_handler(func=lambda m: True)
def echo_all(message):
	bot.reply_to(message, message.text)

bot.infinity_polling()