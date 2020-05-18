function enumeration(nTV) {
	// 返回一个构造函数。并且它的name属性指向他的实例
	var enu = function () {};

	var proto = (enu.prototype = {
		constructor: enu,
		toString: function () {
			return this.name;
		},
		valueOf: function () {
			return this.value;
		},
		toJSON: function (k) {
			return this.name;
		},
	});

	enu.values = [];

	for (name in nTV) {
		var e = Object.create(proto);
		e.name = name;
		e.value = nTV[name];
		enu[name] = e;
		enu.values.push(e);
	}

	enu.foreach = function (f, c) {
		for (var i = 0; i < this.values.length; i++) {
			f.call(c, this.values[i]);
		}
	};

	return enu;
}

function Card(suit, rank) {
	this.suit = suit;
	this.rank = rank;
}

Card.Suit = enumeration({ Culbs: 2, Diamonds: 1, Hearts: 3, Spades: 4 }); // 梅花，方块，红心，黑桃牌
Card.Rank = enumeration({
	Two: 2,
	Three: 3,
	Four: 4,
	Five: 5,
	Six: 6,
	Seven: 7,
	Eight: 8,
	Nine: 9,
	Ten: 10,
	Jack: 11,
	Queen: 12,
	King: 13,
	Ace: 15,
});

Card.prototype.toString = function () {
	return this.rank.toString() + 'of' + this.suit.toString();
};

Card.prototype.compareTo = function (that) {
	if (this.rank < that.rank) return -1;
	if (this.rank > that.rank) return 1;
	return 0;
};

Card.orderByRank = function (a, b) {
	return a.compareTo(b);
};

Card.orderBySuit = function (a, b) {
	// a = {name: xxx, value: xxx},在比较时会调取valueOf的值
	var c = JSON.stringify(a);
	console.log(c);
	console.log(JSON.parse(c));
	if (a.suit < b.suit) return -1;
	if (a.suit > b.suit) return 1;
	if (a.rank < b.rank) return -1;
	if (a.rank > b.rank) return 1;
	return 0;
};

function Deck() {
	var cards = (this.cards = []);
	Card.Suit.foreach(function (s) {
		Card.Rank.foreach(function (r) {
			cards.push(new Card(s, r));
		});
	});
}

Deck.prototype.shuffle = function () {
	var deck = this.cards,
		len = deck.length;
	for (var i = len - 1; i > 0; i--) {
		var r = Math.floor(Math.random() * (i + 1)),
			temp;
		(temp = deck[i]), (deck[i] = deck[r]), (deck[r] = temp);
	}
	return this;
};

Deck.prototype.deal = function (n) {
	if (this.cards.length < n) throw 'out';
	return this.cards.splice(this.cards.length - n, n);
};

var deck = new Deck().shuffle();
var hand = deck.deal(13).sort(Card.orderBySuit);
console.log(hand);
