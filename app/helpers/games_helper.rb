module GamesHelper

	# Generates the HTML for a row of a bingo scoreboard.
	def display_bingo_row (letter, range)
		html = "<tr><td class='letterCell'>#{letter}</td>"
    	range.each do |n|
	        html += "<td>#{n}</td>"
	    end
	    html += "</tr>"
    end
end
