require "rails_helper"

RSpec.describe BingoGame, type: :model do
	it { should serialize :players }
	it { should validate_presence_of :num_players }
	it { should validate_numericality_of(:num_players).only_integer.is_greater_than(1) }
	it { should validate_presence_of :call_cycle }
	it { should validate_numericality_of(:call_cycle).only_integer.is_greater_than(1) }

end