Rails.application.routes.draw do
  get 'password_resets/new'

  get 'password_resets/edit'

  get 'sessions/new'

  root 'static_pages#home'
  get 		'help'  	 => 'static_pages#help'
  get 		'about' 	 => 'static_pages#about'
  get 		'signup' 	 =>	'users#new'
  get		  'login'		 =>	'sessions#new'
  post		'login'		 =>	'sessions#create'
  delete	'logout'	 =>	'sessions#destroy'
  get     'new-game' => 'bingo_games#new'
  get     '/print-cards/:id' => 'bingo_games#print_cards'
  post    'print-cards' => 'bingo_games#print_cards'


 
  resources :users
  resources :bingo_games
  resources :account_activations, only: [:edit]
  resources :password_resets, only: [:new, :create, :edit, :update]
end
