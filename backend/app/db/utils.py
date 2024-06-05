import hashlib
import os


def generate_salt() -> bytes:
    """
    Генерация случайной соли
    """
    return os.urandom(16)


def hash_password(password: str, salt: bytes) -> bytes:
    """
    Получение хэша пароля
    """
    return hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 100000)


def verify_password(
    stored_password_hash: str, stored_salt: str, input_password: str
) -> bool:
    """
    Верификация пароля
    """
    salt = bytes.fromhex(stored_salt)
    input_password_hash = hash_password(input_password, salt)
    return stored_password_hash == input_password_hash.hex()
