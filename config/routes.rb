Rails.application.routes.draw do
  get 'games/new'

  get 'games/show'

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
  get     'new-game' => 'games#new'
  get     'bingo'    => 'games#show'
  post    'bingo'    => 'games#show'


  resources :users
  resources :account_activations, only: [:edit]
  resources :password_resets, only: [:new, :create, :edit, :update]
end
