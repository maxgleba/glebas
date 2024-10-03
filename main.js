// Покемоны
const pikachu = {
    name: 'Pikachu',
    health: 100,
    attack: function() {
        return Math.floor(Math.random() * 10) + 5;
    },
    specialAttack: function() {
        return Math.floor(Math.random() * 20) + 10;
    }
};

const charmander = {
    name: 'Charmander',
    health: 100,
    attack: function() {
        return Math.floor(Math.random() * 10) + 5;
    },
    specialAttack: function() {
        return Math.floor(Math.random() * 20) + 10;
    }
};

// Флаг для предотвращения повторной атаки во время анимации
let isAttacking = false;

// Универсальная функция для обновления прогрессбара
function updateHealthBar(pokemon, healthElement) {
    healthElement.style.width = pokemon.health + '%';
    if (pokemon.health <= 0) {
        pokemon.health = 0;
        alert(pokemon.name + ' has fainted!');
    }
}

// Функция для сброса покебола в исходное положение
function resetPokeball() {
    const pokeball = document.getElementById('pokeball');
    pokeball.style.visibility = 'hidden';
    pokeball.style.top = '50%';  // Возвращаем в центральное положение
    pokeball.style.left = '50%'; // Возвращаем в центральное положение
}

// Функция для показа анимации покебола
function showPokeball(attackerId, targetId) {
    const pokeball = document.getElementById('pokeball');
    pokeball.style.visibility = 'visible';

    // Определяем начальную и конечную позицию полета покебола
    const attacker = document.getElementById(attackerId);
    const target = document.getElementById(targetId);
    const attackerPos = attacker.getBoundingClientRect();
    const targetPos = target.getBoundingClientRect();

    // Устанавливаем покебол в стартовую позицию
    pokeball.style.top = attackerPos.top + 'px';
    pokeball.style.left = attackerPos.left + 'px';

    // Анимация полета покебола к противнику
    setTimeout(() => {
        pokeball.style.top = targetPos.top + 'px';
        pokeball.style.left = targetPos.left + 'px';
    }, 50);

    // Скрываем покебол после атаки
    setTimeout(() => {
        pokeball.style.visibility = 'hidden'; // Покебол исчезает
        resetPokeball(); // Сбрасываем покебол после атаки
        isAttacking = false; // Разрешаем новую атаку
    }, 800);
}

// Универсальная функция для боя
function battle(attacker, defender, healthBarDefender, attackerId, targetId) {
    if (isAttacking) return; // Если анимация еще идет, блокируем атаку
    isAttacking = true; // Блокируем новую атаку до завершения текущей
    showPokeball(attackerId, targetId); // Показываем анимацию покебола
    const damage = attacker.attack();
    defender.health -= damage;
    updateHealthBar(defender, healthBarDefender);
}

// Получаем элементы прогрессбаров
const health1 = document.getElementById('health1');
const health2 = document.getElementById('health2');

// Атака Pikachu
document.getElementById('attack1').addEventListener('click', function() {
    battle(pikachu, charmander, health2, 'pokemon1', 'pokemon2');
});

// Специальная атака Pikachu
document.getElementById('special1').addEventListener('click', function() {
    battle(pikachu, charmander, health2, 'pokemon1', 'pokemon2');
});

// Атака Charmander
document.getElementById('attack2').addEventListener('click', function() {
    battle(charmander, pikachu, health1, 'pokemon2', 'pokemon1');
});

// Специальная атака Charmander
document.getElementById('special2').addEventListener('click', function() {
    battle(charmander, pikachu, health1, 'pokemon2', 'pokemon1');
});
