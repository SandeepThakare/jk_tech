
FROM python:3.10-slim as builder

WORKDIR /app

RUN apt-get update && apt-get install -y \
  build-essential \
  python3-dev \
  && rm -rf /var/lib/apt/lists/*

COPY requirements/prod.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.10-slim

WORKDIR /app

COPY --from=builder /usr/local/lib/python3.10/site-packages/ /usr/local/lib/python3.10/site-packages/
COPY app/ app/
COPY alembic/ alembic/
COPY alembic.ini .

RUN useradd -m appuser && chown -R appuser /app
USER appuser

ENV PYTHONPATH=/app
ENV PORT=8000

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"] 