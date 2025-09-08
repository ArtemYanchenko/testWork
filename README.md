# Form Builder / Count Matches / DSL Project

## 🌐 Production

Готовая версия UI FormBuilder доступна по адресу: https://formbuildermts.netlify.app/

## 📌 Описание

В проекте реализованы три основные части:

1. **Form Builder** — динамические формы на базе [React Hook Form](https://react-hook-form.com/) и [Material UI](https://mui.com/).
2. **countMatches** — функция для подсчёта количества вхождений уникальных элементов массива `A` в массив `B` с использованием `Uint32Array`.
3. **DSL для дашбордов**

Также в проекте есть:
- юнит-тесты (Jest),
- бенчмарки (tinybench),
- линтер (ESLint).
- приттер (Prettier)

---


## ⚙️ Требования

- Node.js >= 18
- npm >= 9

---

## 🚀 Установка и запуск


### 1. Установка зависимостей
```bash
git clone git@github.com:ArtemYanchenko/testWork.git
cd testWork
npm install
```

### 2. Запуск dev-сервера
```bash
npm run dev
```
Приложение откроется по адресу http://localhost:5173

### 3. Тесты
```bash
npm test
```
Будут запущены все тесты для FormBuilder, countMatches и DSL.

### 4. Бенчмарк 
```bash
npm run bench
```
Запускает скрипт benchmarks/countMatches.bench.ts, который проверяет производительность countMatches

