import { cons, car, cdr, toString as pairToString } from '@hexlet/pairs';
import { cons as consList, l, random, head, reverse, toString as listToString } from '@hexlet/pairs-data';

const run = (p1, p2, cards) => {
  const iter = (h1, name1, h2, name2, order, log) => {
    if (h1 <= 0) {
      return consList(cons(car(head(log)), `${name1} был убит`), log);
    }

    const card = random(cards);
    const cardName = car(card);
    const damage = cdr(card)();
    const newHealth = h2 - damage;

    const message = `Игрок ${name1} применил '${cardName}'
      против '${name2}' и нанес урон '${damage}'`;
    let stats;
    if (order === 1) {
      stats = cons(cons(h1, newHealth), message);
    } else if (order === 2) {
      stats = cons(cons(newHealth, h1), message);
    }
    const newLog = consList(stats, log);
    return iter(newHealth, name2, h1, name1, order === 1 ? 2 : 1, newLog);
  };

  const startHealth = 10;
  const logItem = cons(cons(startHealth, startHealth), 'Начинаем бой!');
  return reverse(iter(startHealth, p1, startHealth, p2, 1, l(logItem)));
};

export default cards => (name1, name2) => run(name1, name2, cards);
