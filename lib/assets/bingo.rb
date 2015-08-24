require 'json'

class Player
	attr_accessor :name, :cards

	def initialize (name)
		@name = name
		@cards = []
	end

	def cards_to_json
		@cards.to_json
	end

	def css_id
		@name.gsub(/\s+/, "")
	end
end

class Bingo
	attr_reader :players
	attr_accessor :number_of_players

	def initialize(number_of_players)
		@number_of_players = number_of_players
		@players = []
		number_of_players.times do |p|
			@players << Player.new("Player #{(p.to_i + 1)}")
		end
	end

	def bingo_numbers
		{
			b: (1..15).to_a,
			i: (16..30).to_a,
			n: (31..45).to_a,
			g: (46..60).to_a,
			o: (61..75).to_a 
		}
	end

	def get_number_pairs(num_set)
		number_pairs = []
		num_set.each do |index,value|
			value.each do |i, v|
				number_pairs.push("#{index.capitalize}" + "#{i}")
			end
		end
		number_pairs
	end

	def get_numbers
		numbers = []
		bingo_numbers.each do |index,value| 
			value.each do |i,v|
				numbers.push(i)
			end
		end
		numbers
	end

	def generate_bingo_card_numbers
		card_numbers = {
			B: (bingo_numbers[:b].shuffle)[0..4],
			I: (bingo_numbers[:i].shuffle)[0..4],
			N: (bingo_numbers[:n].shuffle)[0..4],
			G: (bingo_numbers[:g].shuffle)[0..4],
			O: (bingo_numbers[:o].shuffle)[0..4]
		}

		card_numbers[:N][2] = "Free"
		card_numbers
	end

	def distribute_cards(cards_per_player)
		@players.each do |p|
			cards_per_player.times do |c|
				p.cards.push(generate_bingo_card_numbers())
			end
		end
	end
end