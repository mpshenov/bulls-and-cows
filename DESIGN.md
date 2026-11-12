# DESIGN.md — Bulls and Cows

## 1. Структуры данных

### Состояние игры (`GameState`, `src/logic/state.ts`)

```ts
type GameState = {
  secret: string;
  length: number;
  base: number;
  history: Attempt[];
  status: 'playing' | 'won';
  startedAt: number;
};
secret: string — секрет хранится строкой, а не числом: это сохраняет лидирующие нули ('0123'), которые потерялись бы при Number('0123') → 123.

history: Attempt[] — история попыток. Пополняется иммутабельно: [...state.history, attempt] создаёт новый массив, старые записи не меняются.

status: 'playing' | 'won' — union из двух значений: TypeScript не даст записать недопустимый статус.

startedAt: number — время старта (Date.now()), передаётся параметром в createInitialState, а не вызывается внутри — это делает функцию детерминированной и тестируемой.

Попытка (Attempt, src/logic/state.ts)
ts
type Attempt = {
  guess: string;
  bulls: number;
  cows: number;
};
Одна попытка = ввод игрока + результат оценки. Время не хранится в Attempt (оно одно на раунд — startedAt). Номер попытки — её индекс в history, отдельно не дублируется (единственный источник истины).

2. Алгоритмы
evaluateGuess (src/logic/evaluateGuess.ts)
Сравнивает secret и guess посимвольно и возвращает { bulls, cows }.

Приводит обе строки к нижнему регистру (toLowerCase) — для hex 'a' и 'A' считаются одной цифрой.

Bulls: [...s].filter((ch, i) => ch === g[i]).length — символы на своих позициях.

Cows: [...g].filter((ch, i) => ch !== s[i] && s.includes(ch)).length — символы не на своих позициях, но присутствующие в секрете. Условие ch !== s[i] исключает быков из подсчёта коров (иначе одна цифра считалась бы дважды).

Реализовано через filter (HOF), без ручных циклов со счётчиками.

countPossibleSecrets (src/logic/countPossibleSecrets.ts)
Считает число возможных секретов: P(base, length) = base! / (base − length)!.

Рекурсивная формула: countPossibleSecrets(length, base) = base * countPossibleSecrets(length − 1, base − 1).

Базовые случаи: length === 0 → 1, length > base → 0.

Мемоизация: кеш Map<string, number> в замыкании (IIFE). Рекурсивный вызов идёт через calc — через мемоизированную функцию, поэтому кеш работает на всех уровнях рекурсии.

Ключ кеша — `${length},${base}` (с разделителем, чтобы избежать коллизий вроде 1,23 vs 12,3).

3. Сложность (Big O)
generateSecret — O(n)
n = length. Цикл набирает length уникальных цифр. Проверка уникальности — result.includes(digit), для массива длины ≤ n даёт O(n) на шаг → в худшем случае O(n²). При использовании Set можно добиться O(n). Память: O(n) на результат.

evaluateGuess — O(n)
n = length секрета. Два прохода filter по n символам, каждый includes — O(n) → в худшем случае O(n²). При переходе на Set для includes — O(n). Память: O(n) на промежуточные массивы ([...s], [...g]).

isValidGuess — O(n)
n = length. Проверка длины — O(1). Проверка каждого символа через createDigitValidator (внутри — includes по строке алфавита длины ≤ 16, то есть O(1)) → O(n). Проверка уникальности через Set — O(n). Итого O(n). Память: O(n) на Set.

countPossibleSecrets — O(length)
Без мемоизации — линейная рекурсивная цепочка глубины length, каждый шаг O(1) → O(length). С мемоизацией повторные вызовы с теми же аргументами возвращаются за O(1), что экономит вычисления при пересекающихся вызовах. Память: O(length) на кеш.

4. Принципы чистого кода
Чистые функции
createDigitValidator (src/logic/createDigitValidator.ts) — принимает base, возвращает предикат; не зависит от внешнего состояния.

generateSecret (src/logic/generateSecret.ts) — источник случайности передан параметром random (по умолчанию Math.random), поэтому функция детерминирована при фиксированном random.

countPossibleSecrets (src/logic/countPossibleSecrets.ts) — кеш хранится в замыкании IIFE, наружу не «протекает».

Иммутабельность
addAttempt (src/logic/state.ts) — [...state.history, attempt] и { ...state, history, status }: создаётся новый объект, старый не мутируется.

saveRecord (src/ui/records.ts) — [...records, entry].sort(...).slice(0, 10): новый массив, старый не меняется.

DRY (Don't Repeat Yourself)
createDigitValidator переиспользуется в isValidGuess (src/logic/isValidGuess.ts), в settings.ts (фильтрация ввода) и в game.ts (фильтр поля ввода). Одна фабрика — три точки использования.

Функции высшего порядка
evaluateGuess — filter + length вместо ручных циклов.

isValidGuess — every для проверки всех символов.

renderSettings (src/ui/settings.ts) — Array.from(...)/for...of для опций.

Каррирование
createDigitValidator(base) → (char) => boolean — каррированная фабрика: base фиксируется, возвращается предикат от одного символа, готовый для передачи в filter/every.

Разделение ответственности
Логика (src/logic/) не зависит от DOM — тестируется в Node (Vitest, environment: 'node').

UI (src/ui/) использует логику, но не содержит её.

main.ts — только сборка: renderSettings / renderGame / renderWin + коллбеки.
```
