# Hamyon

React'da yozilgan shaxsiy moliya ilovasi: daromad va xarajatlarni yuritish, oylik hisobot va byudjet limitlari.

## Imkoniyatlar

- **Boshqaruv paneli** — umumiy balans, oylik daromad/xarajat/tejam, xarajatlar halqa diagrammasi, oxirgi 6 oy ustunli diagrammasi (kutubxonasiz SVG)
- **Operatsiyalar** — qo'shish, tahrirlash, o'chirish; tur, kategoriya va izoh bo'yicha filtr; CSV'ga eksport
- **Byudjet** — kategoriyalarga oylik limit, limitga yaqinlashganda va oshganda ogohlantirish
- **Oy tanlash** — barcha sahifalar tanlangan oy bo'yicha ishlaydi
- Ma'lumotlar brauzerda (`localStorage`) saqlanadi; birinchi ochilishda namunaviy ma'lumotlar yuklanadi
- Yorug' va qorong'i rejim, mobilga moslashgan

## Texnologiyalar

React 18 · Vite · React Router (HashRouter) · Context + useReducer · lucide-react

## Ishga tushirish

```bash
npm install
npm run dev
```

Production build: `npm run build` (natija `dist/` papkasida).

## GitHub Pages'ga joylash

1. `npm run build`
2. `npx gh-pages -d dist`
3. Repo Settings → Pages bo'limida `gh-pages` branchini tanlang

## Papkalar

```
src/
  components/   Sidebar, MonthPicker, DonutChart, MonthlyBars, BudgetBar, TransactionModal
  pages/        Dashboard, Transactions, Budgets
  store/        FinanceContext (reducer, oy bo'yicha hisob-kitob, localStorage)
  data/         constants (kategoriyalar), seed (namunaviy ma'lumotlar)
  utils/        format (pul, sana, CSV)
```

## Keyingi qadamlar (g'oyalar)

- Takrorlanuvchi operatsiyalar (oylik to'lovlar)
- Bir nechta hamyon/hisob va ular orasida o'tkazma
- Backend bilan sinxronlash
# hamyon
