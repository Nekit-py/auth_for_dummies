import socket

def get_en0_ip():
    try:
        # Создаем сокет
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # Подключаемся к удаленному серверу (8.8.8.8 - общедоступный DNS-сервер Google)
        s.connect(('8.8.8.8', 80))
        # Получаем IP-адрес сокета
        ip_address = s.getsockname()[0]
        # Закрываем сокет
        s.close()
        return ip_address
    except socket.error as e:
        raise RuntimeError('Ошибка при получении IP-адреса: {}'.format(e))

# Используем функцию
try:
    ip_address = get_en0_ip()
    print('IP-адрес en0:', ip_address)
except RuntimeError as e:
    print(e)
