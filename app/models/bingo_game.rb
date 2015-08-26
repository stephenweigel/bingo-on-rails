class BingoGame < ActiveRecord::Base
	serialize :players
	validates :num_players, presence: true, numericality: {
											only_integer: true,
											greater_than: 1
	}
	validates :call_cycle, presence: true, numericality: { 
											only_integer: true,
											greater_than: 1 
	}
end
