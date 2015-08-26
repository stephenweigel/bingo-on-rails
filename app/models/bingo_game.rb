class BingoGame < ActiveRecord::Base
	serialize :players
	validates :players, presence: true
	validates :call_cycle, presence: true, numericality: { 
											only_integer: true,
											greater_than: 1 }
end
