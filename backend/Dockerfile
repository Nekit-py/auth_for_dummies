FROM python:3.12-slim

RUN pip install poetry

COPY pyproject.toml poetry.lock ./
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

COPY . /app
WORKDIR /app

ENV TZ="Europe/Moscow"

CMD ["python3", "main.py"]
